'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function RotatingText({
  texts,
  interval = 2500,
  className = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <motion.span 
      layout
      transition={{ layout: { type: 'spring', stiffness: 350, damping: 35 } }}
      className={`inline-flex flex-col relative overflow-hidden align-middle justify-center max-w-full ${className}`}
      style={{ height: '1.5em', paddingBottom: '0.1em', marginBottom: '-0.1em' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 25 },
            opacity: { duration: 0.15 },
          }}
          className="inline-block whitespace-nowrap text-[var(--accent-strong)] font-bold"
          style={{ lineHeight: '1.2' }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
