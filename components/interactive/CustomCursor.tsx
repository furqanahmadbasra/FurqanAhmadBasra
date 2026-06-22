'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const coordX = useMotionValue(0);
  const coordY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const coordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      coordX.set(e.clientX);
      coordY.set(e.clientY);

      if (coordRef.current) {
        coordRef.current.textContent = `X:${String(Math.round(e.clientX)).padStart(4, '0')} Y:${String(Math.round(e.clientY)).padStart(4, '0')}`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, coordX, coordY]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Crosshair */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-[1px] bg-cyan" />
        {/* Vertical line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-5 bg-cyan" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan" />
      </motion.div>

      {/* Coordinate readout */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '12px',
          translateY: '12px',
        }}
      >
        <div
          ref={coordRef}
          className="font-mono text-[9px] tracking-[0.15em] text-cyan/60"
        >
          X:0000 Y:0000
        </div>
      </motion.div>
    </>
  );
}
