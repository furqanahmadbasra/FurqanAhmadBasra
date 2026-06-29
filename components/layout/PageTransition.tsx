'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const columns = 5;

  const anim = {
    initial: {
      scaleY: 1,
      transformOrigin: 'bottom',
    },
    enter: (i: number) => ({
      scaleY: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.05 * i,
      }
    }),
    exit: (i: number) => ({
      scaleY: 1,
      transformOrigin: 'top',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.05 * i,
      }
    })
  };

  return (
    <div key={pathname} className="w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        className="w-full h-full"
        style={{ willChange: 'opacity, transform, filter' }}
      >
        {children}
      </motion.div>

      <div className="fixed inset-0 pointer-events-none z-[9999] flex w-full h-screen">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={anim}
            initial="initial"
            animate="enter"
            className="w-full bg-[#050505] relative"
            style={{ willChange: 'transform' }}
          />
        ))}
      </div>
    </div>
  );
}
