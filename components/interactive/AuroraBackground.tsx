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
      <div className="absolute inset-0 bg-slate-50"></div>
      
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
          className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-blue-300/40 mix-blend-multiply filter blur-[80px]"
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
          className="absolute top-[5%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-300/30 mix-blend-multiply filter blur-[90px]"
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
          className="absolute bottom-[10%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-indigo-300/30 mix-blend-multiply filter blur-[100px]"
        />
      </div>
    </div>
  );
}
