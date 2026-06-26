'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollingLine() {
  // Automatically tracks the vertical scroll progress of the entire window (0 to 1)
  const { scrollYProgress } = useScroll();

  // Morph the color from silver to white to dark grey to silver again as they scroll
  const pathColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#71717a', '#ffffff', '#a1a1aa', '#ffffff']
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-40">
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}
      >
        <motion.path
          d="
            M 50,0
            C 80,10 80,20 50,30
            C 20,40 20,50 50,60
            C 100,70 100,45 50,45
            C 0,45 0,80 50,85
            C 80,90 80,95 50,100
          "
          fill="none"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: scrollYProgress,
            stroke: pathColor,
          }}
        />
      </svg>
    </div>
  );
}
