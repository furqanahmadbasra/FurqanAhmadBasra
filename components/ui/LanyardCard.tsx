'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import * as THREE from 'three';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface LanyardCardProps {
  /** Path to the profile image shown on the card face */
  imageSrc?: string;
  /** Gravity strength (positive = pulls down) */
  gravity?: number;
  /** Camera distance from scene */
  cameraDistance?: number;
  /** Where the card starts: 'left' | 'right' | 'top' | 'bottom' */
  startPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Accent / clip colour for the metal clip */
  clipColor?: string;
  /** Card background colour when no image */
  cardColor?: string;
  /** String / lanyard colour */
  stringColor?: string;
  /** Ambient lighting intensity 0-100 */
  lightingIntensity?: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CARD_GLB_URL =
  'https://framerusercontent.com/assets/mv3nY4GEDXqOTCVSvcDUNBfFOI.glb';

const STRING_IMAGE_URL =
  'https://framerusercontent.com/images/7z2NUtv9Vd9AMoaXZ7U5TbGrV0.png';

const EMPTY_TEXTURE_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

const START_POSITION_MAP: Record<string, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  top: [0, 0],
  bottom: [0, -2.2],
};

// ---------------------------------------------------------------------------
// Helper: apply texture wrapping / anisotropy
// ---------------------------------------------------------------------------
function applyTextureOptions(texture: THREE.Texture) {
  if (!texture) return;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
}

// ---------------------------------------------------------------------------
// CameraController – set camera position every frame
// ---------------------------------------------------------------------------
function CameraController({ position }: { position: [number, number, number] }) {
  useFrame(({ camera }) => {
    camera.position.set(...position);
  });
  return null;
}

// ---------------------------------------------------------------------------
// Band – the rope + physics card
// ---------------------------------------------------------------------------

// Teach R3F / TypeScript about the extended meshline JSX elements
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: object;
      meshLineMaterial: object;
    }
  }
}

interface BandProps {
  cardImageSrc: string;
  clipColor: string;
  cardColor: string;
  stringColor: string;
  cardStartPosition: [number, number];
  interactive: boolean;
  width: number;
  height: number;
}

function Band({
  cardImageSrc,
  cardColor,
  clipColor,
  stringColor,
  cardStartPosition,
  interactive,
  width,
  height,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<MeshLineMaterial>(null!);
  const fixed = useRef<any>(null!);
  const j1 = useRef<any>(null!);
  const j2 = useRef<any>(null!);
  const j3 = useRef<any>(null!);
  const card = useRef<any>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB_URL) as any;

  // Load string texture
  const [stringTexture, setStringTexture] = useState<THREE.Texture | null>(null);
  const [stringAspectRatio, setStringAspectRatio] = useState(1);
  useEffect(() => {
    let mounted = true;
    new THREE.TextureLoader().load(
      STRING_IMAGE_URL,
      (tex) => {
        if (!mounted) return;
        applyTextureOptions(tex);
        const ar = (tex.image?.width ?? 1) / (tex.image?.height ?? 1);
        setStringAspectRatio(ar || 1);
        setStringTexture(tex);
      },
      undefined,
      () => { /* ignore string texture errors */ }
    );
    return () => { mounted = false; };
  }, []);

  // Update rope material reactively
  useEffect(() => {
    if (!materialRef.current) return;
    const mat = materialRef.current as any;
    mat.color = new THREE.Color(stringTexture ? '#FFFFFF' : stringColor);
    mat.depthTest = false;
    mat.resolution = new THREE.Vector2(width, height);
    mat.useMap = stringTexture ? 1 : 0;
    mat.map = stringTexture ?? null;
    if (stringTexture) {
      mat.repeat = new THREE.Vector2(-17 / stringAspectRatio, 1);
    }
    mat.lineWidth = 1;
    mat.needsUpdate = true;
  }, [stringTexture, stringColor, width, height, stringAspectRatio]);

  // Load card texture
  const cardTexture = useTexture(cardImageSrc || EMPTY_TEXTURE_URL);
  useEffect(() => {
    if (cardTexture) applyTextureOptions(cardTexture);
  }, [cardTexture]);

  // Catmull-Rom curve for the rope
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  // Physics joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  // Cursor style
  useEffect(() => {
    if (hovered && interactive) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged, interactive]);

  const maxSpeed = 50;
  const minSpeed = 0;

  useFrame((state, delta) => {
    if (dragged) {
      vec
        .set(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const dist = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + dist * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      (band.current.geometry as MeshLineGeometry).setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation() as unknown as THREE.Vector3);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  const [cardX, cardY] = cardStartPosition;

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Fixed anchor at top */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[cardX * 0.5, cardY * 0.5, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[cardX, cardY, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[cardX * 1.5, cardY * 1.5, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[cardX * 2, cardY * 2, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e: any) => {
              if (!interactive) return;
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
              e.stopPropagation();
            }}
            onPointerDown={(e: any) => {
              if (!interactive) return;
              e.target.setPointerCapture(e.pointerId);
              if (card.current) {
                setDragged(
                  new THREE.Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation()))
                );
              }
              e.stopPropagation();
            }}
            onPointerMove={(e: any) => {
              if (interactive && dragged) e.stopPropagation();
            }}
          >
            {/* Card mesh */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                color={new THREE.Color(cardImageSrc ? '#FFFFFF' : cardColor)}
                map={cardTexture}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            {/* Clip */}
            <mesh geometry={nodes.clip.geometry}>
              <meshPhysicalMaterial
                color={new THREE.Color(clipColor)}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            {/* Clamp */}
            <mesh geometry={nodes.clamp.geometry}>
              <meshPhysicalMaterial
                color={new THREE.Color(clipColor)}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Rope */}
      <mesh ref={band}>
        {/* @ts-expect-error meshline registered via extend() at runtime */}
        <meshLineGeometry />
        {/* @ts-expect-error meshline JSX types not fully compatible */}
        <meshLineMaterial ref={materialRef} />
      </mesh>
    </>
  );
}

// ---------------------------------------------------------------------------
// LanyardScene – the Canvas wrapper
// ---------------------------------------------------------------------------
interface LanyardSceneProps {
  cardImageSrc: string;
  cardColor: string;
  clipColor: string;
  stringColor: string;
  startPosition: 'left' | 'right' | 'top' | 'bottom';
  gravity: number;
  cameraDistance: number;
  lightingIntensity: number;
  interactive: boolean;
}

function LanyardScene({
  cardImageSrc,
  cardColor,
  clipColor,
  stringColor,
  startPosition,
  gravity,
  cameraDistance,
  lightingIntensity,
  interactive,
}: LanyardSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      setDims({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    });
    ro.observe(containerRef.current);
    setDims({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => ro.disconnect();
  }, []);

  const camPos: [number, number, number] = [0, 0, cameraDistance];
  const li = 1 + (lightingIntensity - 50) / 50;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: new THREE.Vector3(...camPos), fov: 20 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0), 0)}
        style={{
          width: dims.width,
          height: dims.height,
          touchAction: interactive ? 'none' : 'auto',
        }}
      >
        <CameraController position={camPos} />
        <ambientLight intensity={Math.PI * li} />

        <Physics gravity={[0, -gravity, 0]} timeStep={1 / 60}>
          <Band
            cardImageSrc={cardImageSrc}
            cardColor={cardColor}
            clipColor={clipColor}
            stringColor={stringColor}
            cardStartPosition={START_POSITION_MAP[startPosition]}
            interactive={interactive}
            width={dims.width}
            height={dims.height}
          />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer
            intensity={2 * li}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3 * li}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3 * li}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10 * li}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LanyardCard – public API that generates the card texture from imageSrc
// ---------------------------------------------------------------------------
export function LanyardCard({
  imageSrc = '/your_picture.jpeg',
  gravity = 40,
  cameraDistance = 20,
  startPosition = 'right',
  clipColor = '#667073',
  cardColor = '#1a1a1a',
  stringColor = '#444444',
  lightingIntensity = 55,
}: LanyardCardProps) {
  const [cardImageUrl, setCardImageUrl] = useState('');

  // Build a double-wide canvas texture: left=front photo, right=back (solid)
  useEffect(() => {
    if (!imageSrc) return;
    let mounted = true;
    const resolution = 1024;

    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill card background
    ctx.fillStyle = cardColor;
    ctx.fillRect(0, 0, resolution, resolution);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!mounted) return;
      // Draw image on the left half (front face)
      const targetW = resolution / 2;
      const targetH = resolution * 0.757;
      const imgAR = img.width / img.height;
      const targetAR = targetW / targetH;

      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (imgAR > targetAR) {
        drawH = targetH;
        drawW = targetH * imgAR;
        drawX = (targetW - drawW) / 2;
        drawY = 0;
      } else {
        drawW = targetW;
        drawH = targetW / imgAR;
        drawX = 0;
        drawY = (targetH - drawH) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, targetW, resolution);
      ctx.clip();
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Flip canvas vertically (Three.js UV origin is bottom-left)
      const tmp = document.createElement('canvas');
      tmp.width = resolution;
      tmp.height = resolution;
      const tc = tmp.getContext('2d')!;
      tc.scale(1, -1);
      tc.translate(0, -resolution);
      tc.drawImage(canvas, 0, 0);

      if (mounted) setCardImageUrl(tmp.toDataURL());
    };
    img.onerror = () => {
      // No image – just use solid card color
      if (mounted) setCardImageUrl('');
    };
    img.src = imageSrc;

    return () => { mounted = false; };
  }, [imageSrc, cardColor]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        /* Ensure this sits above the particle layer */
        zIndex: 10,
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
    >
      <LanyardScene
        cardImageSrc={cardImageUrl}
        cardColor={cardColor}
        clipColor={clipColor}
        stringColor={stringColor}
        startPosition={startPosition}
        gravity={gravity}
        cameraDistance={cameraDistance}
        lightingIntensity={lightingIntensity}
        interactive={true}
      />
    </div>
  );
}
