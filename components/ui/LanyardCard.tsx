'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface LanyardCardProps {
  imageSrc?: string;
  imageAlt?: string;
  backContent: React.ReactNode;
}

export function LanyardCard({ 
  imageSrc = '/your-picture.jpg',
  imageAlt = 'Profile picture',
  backContent 
}: LanyardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Physics values for dragging and swinging
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // 3D Tilt values
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Add a slight rotation based on horizontal drag to simulate pendulum swinging
  const rotateZ = useTransform(x, [-200, 200], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-20deg to 20deg)
    const rX = ((mouseY / height) - 0.5) * -40; // Tilt up/down
    const rY = ((mouseX / width) - 0.5) * 40; // Tilt left/right
    
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center group perspective-1000">
      

      {/* The Actual Card (Draggable, Flippable, and Tiltable) */}
      <motion.div
        ref={cardRef}
        drag
        dragElastic={0.2}
        dragConstraints={{ top: 0, left: -50, right: 50, bottom: 50 }}
        whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
        style={{ x, y, rotateZ, rotateX, rotateY, originY: -0.5 }}
        className="relative w-full max-w-[340px] h-[360px] cursor-grab mt-[60px] z-20"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="w-full h-full transition-transform duration-700 relative"
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
          }}
        >
          {/* Front Face (Details - Default) */}
          <div 
            className="absolute w-full h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] backdrop-blur-xl overflow-hidden shadow-[var(--shadow)] p-6 flex flex-col justify-center"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)' 
            }}
          >
            {/* Lanyard Hole */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-[var(--line)] rounded-full border border-[var(--surface-soft)] shadow-inner z-30" />
            
            <div className="mt-4">
              {backContent}
            </div>
            <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span className="bg-black/60 text-white px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md">
                Drag to swing • Hover to see photo
              </span>
            </div>
          </div>
          
          {/* Back Face (Picture - Hovered/Flipped) */}
          <div 
            className="absolute w-full h-full rounded-2xl border border-[var(--line)] overflow-hidden shadow-[var(--shadow)] bg-[var(--surface)] flex items-center justify-center"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-[var(--surface-soft)] rounded-full border border-[var(--line)] shadow-inner z-30 backdrop-blur-md" />
            
            <Image 
              src={imageSrc} 
              alt={imageAlt} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              unoptimized={imageSrc.endsWith('.svg')}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement?.classList.add('bg-gradient-to-br', 'from-[var(--surface)]', 'to-[var(--bg)]');
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
