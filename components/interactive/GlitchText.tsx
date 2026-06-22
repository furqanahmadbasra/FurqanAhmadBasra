'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export default function GlitchText({
  children,
  className = '',
  as: Tag = 'h2',
}: GlitchTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Tag ref={ref} className={`relative inline-block ${className}`}>
      {/* Base layer */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layer 1 — Cyan offset */}
      {isInView && (
        <motion.span
          className="absolute inset-0 text-cyan opacity-0"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0, 0.6, 0],
            x: [0, -3, 2, -1, 0],
            y: [0, 1, -1, 0, 0],
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          style={{ clipPath: 'inset(10% 0 60% 0)' }}
        >
          {children}
        </motion.span>
      )}

      {/* Glitch layer 2 — Magenta offset */}
      {isInView && (
        <motion.span
          className="absolute inset-0 text-magenta opacity-0"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0, 0.4, 0],
            x: [0, 2, -3, 1, 0],
            y: [0, -1, 2, 0, 0],
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            delay: 0.05,
          }}
          style={{ clipPath: 'inset(50% 0 20% 0)' }}
        >
          {children}
        </motion.span>
      )}
    </Tag>
  );
}
