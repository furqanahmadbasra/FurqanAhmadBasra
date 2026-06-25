'use client';

import { motion } from 'framer-motion';

export function AnimatedBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ backgroundColor: 'var(--bg)' }} aria-hidden>
      
      {/* Premium Noise Texture */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      />
      
      {/* Soft Ambient Orbs for Depth */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-zinc-600/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 100, -60, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-neutral-600/10 blur-[140px]"
      />
      
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, 120, -80, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-stone-500/5 blur-[100px]"
      />

      {/* Floating Sparkles / Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.5, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-[var(--line)] rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.05)]"
          style={{
            bottom: '-5%',
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
