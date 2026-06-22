'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CornerHUD() {
  const [time, setTime] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const pkt = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(pkt);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top-left: Page index */}
      <div className="fixed top-16 left-6 z-50 font-mono text-[10px] tracking-[0.15em] text-text-muted pointer-events-none">
        {'// OPERATOR.SYS'}
      </div>

      {/* Bottom-left: Scroll progress */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <div className="w-[2px] h-24 bg-border-ghost overflow-hidden">
          <motion.div
            className="w-full bg-cyan origin-top"
            style={{ scaleY, height: '100%' }}
          />
        </div>
      </div>

      {/* Bottom-right: Coordinates + Clock */}
      <div className="fixed bottom-6 right-6 z-50 font-mono text-[10px] tracking-[0.15em] text-text-muted pointer-events-none text-right">
        <div>LAT 31.41 / LON 73.08</div>
        <div className="text-cyan mt-1">{time || '--:--:--'} PKT</div>
      </div>
    </>
  );
}
