'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function HeroLede({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p layout className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.span layout className="inline-flex items-center" transition={{ layout: { type: 'spring', stiffness: 350, damping: 35 } }} key={index}>
          {child}
        </motion.span>
      ))}
    </motion.p>
  );
}
