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
    <span className={`inline-flex flex-col relative overflow-hidden h-[1.2em] vertical-align-middle ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 25 },
            opacity: { duration: 0.2 },
          }}
          className="inline-block whitespace-nowrap text-blue-600 font-semibold"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
