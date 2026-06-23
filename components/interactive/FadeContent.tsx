'use client';

import { motion } from 'framer-motion';

export function FadeContent({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
