'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const sections = [
  { id: '01', label: 'BOOT.SYS', threshold: 0 },
  { id: '02', label: 'KERNEL.LOG', threshold: 0.14 },
  { id: '03', label: 'SKILLS.MAP', threshold: 0.28 },
  { id: '04', label: 'PROJECTS.EXE', threshold: 0.42 },
  { id: '05', label: 'EXEC.LOG', threshold: 0.6 },
  { id: '06', label: 'CREDS.LIST', threshold: 0.78 },
  { id: '07', label: 'UPLINK', threshold: 0.9 },
];

export default function ScrollCompanion() {
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(sections[0]);
  const [scrollPct, setScrollPct] = useState(0);

  // Smooth spring for the Y position along the side rail
  const rawY = useTransform(scrollYProgress, [0, 1], [10, 90]);
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setScrollPct(Math.round(v * 100));
      const active = [...sections].reverse().find((s) => v >= s.threshold) || sections[0];
      setCurrentSection(active);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed right-6 top-0 bottom-0 z-40 pointer-events-none hidden lg:flex flex-col items-end justify-start"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {/* Rail line */}
      <div className="absolute right-0 top-[10%] bottom-[10%] w-[1px] bg-border-ghost" />

      {/* Scrolling dot on rail */}
      <motion.div
        className="absolute right-0 w-[1px] flex flex-col items-end gap-1"
        style={{ top: springY.get() + '%' }}
      >
        {/* Glowing dot */}
        <div className="w-2 h-2 rounded-full bg-cyan mr-[-3.5px] shadow-[0_0_8px_2px_rgba(0,245,255,0.6)]" />
      </motion.div>

      {/* Section label — floats next to current */}
      <motion.div
        className="absolute right-5 font-mono text-[9px] tracking-[0.15em] text-cyan whitespace-nowrap text-right"
        style={{ top: springY.get() + '%' }}
        key={currentSection.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-text-muted/50">S</span> {currentSection.id} <span>{'//'}</span> {currentSection.label}
        <br />
        <span className="text-text-muted/40">{scrollPct}%</span>
      </motion.div>
    </motion.div>
  );
}
