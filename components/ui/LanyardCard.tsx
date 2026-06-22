'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

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
  
  // Add a slight rotation based on horizontal drag to simulate pendulum swinging
  const rotateZ = useTransform(x, [-200, 200], [-15, 15]);

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center group perspective-1000">
      
      {/* The Lanyard "Thread" or "String" */}
      <motion.div 
        className="absolute top-[-50px] w-1 bg-slate-800 shadow-sm z-0 rounded-full"
        style={{
          height: '100px', // Base string length
          // Stretch the string slightly as you drag down
          scaleY: useTransform(y, [0, 100], [1, 1.2]),
          originY: 0, // Stretch from the top
        }}
      />
      
      {/* The Lanyard "Clip" */}
      <motion.div 
        className="absolute top-[40px] w-4 h-6 bg-slate-300 rounded-sm border border-slate-400 z-10 shadow-sm"
        style={{ x, y, rotateZ, originY: -1.5 }}
      />

      {/* The Actual Card (Draggable and Flippable) */}
      <motion.div
        ref={cardRef}
        drag
        dragElastic={0.2}
        dragConstraints={{ top: 0, left: -50, right: 50, bottom: 50 }}
        whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
        style={{ x, y, rotateZ, originY: -0.5 }}
        className="relative w-full max-w-[340px] h-[360px] cursor-grab mt-[60px] z-20"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="w-full h-full transition-transform duration-700 relative"
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
          }}
        >
          {/* Front Face (Picture) */}
          <div 
            className="absolute w-full h-full rounded-2xl border border-slate-200/60 overflow-hidden shadow-xl bg-slate-100 flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {/* Lanyard Hole */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/50 rounded-full border border-slate-300 shadow-inner z-30 backdrop-blur-md" />
            
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-50', 'to-slate-100');
              }}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span className="bg-black/60 text-white px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md">
                Drag to swing • Click to flip
              </span>
            </div>
          </div>
          
          {/* Back Face (Details) */}
          <div 
            className="absolute w-full h-full rounded-2xl border border-slate-200/60 bg-[rgba(251,252,254,0.95)] backdrop-blur-xl overflow-hidden shadow-2xl p-6 flex flex-col justify-center"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            {/* Lanyard Hole on the back too */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-200 rounded-full border border-slate-300 shadow-inner z-30" />
            
            <div className="mt-4">
              {backContent}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
