'use client';

import { useTypewriter } from '@/lib/hooks/useTypewriter';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  title?: string;
  lines: string[];
  className?: string;
  loop?: boolean;
}

export default function TerminalWindow({
  title = '~/system.log',
  lines,
  className = '',
  loop = true,
}: TerminalWindowProps) {
  const { displayedLines } = useTypewriter(lines, 28, 500, loop);

  return (
    <motion.div
      className={`terminal-window p-0 w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border-ghost">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-hazard/60" />
          <div className="w-3 h-3 rounded-full bg-amber/60" />
          <div className="w-3 h-3 rounded-full bg-green-terminal/60" />
        </div>
        <span className="text-[10px] tracking-[0.12em] text-text-muted uppercase font-mono ml-1">
          {title}
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-6 min-h-[220px] space-y-2">
        {displayedLines.map((line, i) => (
          <div key={i} className="font-mono text-xs text-text-muted leading-relaxed flex items-start gap-2">
            <span className="text-cyan shrink-0 mt-0.5">{'>'}</span>
            <span className="text-green-terminal/80">{line}</span>
          </div>
        ))}
        {/* Blinking cursor */}
        <span className="inline-block w-2 h-3.5 bg-cyan animate-blink ml-6 align-middle" />
      </div>
    </motion.div>
  );
}
