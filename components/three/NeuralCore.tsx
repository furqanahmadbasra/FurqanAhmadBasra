'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useUIStore } from '@/lib/store/useUIStore';
import * as THREE from 'three';

function IcosahedronWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial 
        color="#00F5FF" 
        wireframe={true} 
        transparent={true} 
        opacity={0.15} 
      />
    </mesh>
  );
}

export default function NeuralCore() {
  const stealthMode = useUIStore((s) => s.stealthMode);

  if (stealthMode) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-70 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <IcosahedronWireframe />
      </Canvas>
    </div>
  );
}
