'use client';

import { motion } from 'framer-motion';

export function SoftAurora({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-20 bg-slate-50/50 ${className}`}>
      <div className="absolute -inset-[20%] opacity-60 filter blur-[120px] mix-blend-multiply">
        {/* Soft, slowly shifting color blobs */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 60, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-blue-200/30"
        />
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] right-[15%] w-[50vw] h-[50vw] rounded-full bg-indigo-200/20"
        />
        <motion.div
          animate={{
            x: [0, 50, -60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[15%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-cyan-200/30"
        />
      </div>
    </div>
  );
}
