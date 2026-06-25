'use client';

import { motion } from 'framer-motion';

export function AuroraBackground({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Background base */}
      <div className="absolute inset-0 bg-[var(--bg)]"></div>
      
      {/* Animated blobs */}
      <div className="absolute -inset-[10%] opacity-80">
        <motion.div
          animate={{
            x: ['0%', '10%', '-5%', '0%'],
            y: ['0%', '5%', '-10%', '0%'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-zinc-600/10 filter blur-[80px]"
        />
        <motion.div
          animate={{
            x: ['0%', '-10%', '5%', '0%'],
            y: ['0%', '-5%', '10%', '0%'],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[5%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-neutral-600/10 filter blur-[90px]"
        />
        <motion.div
          animate={{
            x: ['0%', '5%', '-10%', '0%'],
            y: ['0%', '-10%', '5%', '0%'],
            scale: [1, 1.05, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-stone-500/10 filter blur-[100px]"
        />
      </div>
    </div>
  );
}
