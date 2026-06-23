'use client';

import { motion } from 'framer-motion';

export function ShinyText({ 
  text, 
  className = '',
  shineColor = 'rgba(37, 99, 235, 0.4)'
}: { 
  text: string, 
  className?: string,
  shineColor?: string
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, transparent 0%, ${shineColor} 50%, transparent 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'inherit',
        display: 'inline-block'
      }}
      animate={{
        backgroundPosition: ['200% center', '-200% center'],
      }}
      transition={{
        duration: 3,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {text}
    </motion.span>
  );
}
