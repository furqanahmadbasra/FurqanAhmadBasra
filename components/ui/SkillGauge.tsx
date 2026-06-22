'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillGaugeProps {
  label: string;
  value: number;
  color?: string;
}

export default function SkillGauge({ label, value, color = '#FFB200' }: SkillGaugeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase">
          {label}
        </span>
        <span className="font-mono text-[10px] font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      {/* Thicker bar — more visible */}
      <div className="h-2 bg-graphite/80 border border-border-ghost overflow-hidden">
        <motion.div
          className="h-full origin-left"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: value / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
