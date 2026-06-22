'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store/useUIStore';

const bootLines = [
  'INITIALIZING FAB-OS v2.6...',
  'LOADING KERNEL MODULES...',
  '> neural_core.sys ............. OK',
  '> search_engine.idx ........... OK',
  '> rag_pipeline.svc ............ OK',
  '> crdt_sync.engine ............ OK',
  '> compiler.backend ............ OK',
  'MOUNTING /projects ...',
  'ESTABLISHING NEURAL LINK ...',
  'ALL SYSTEMS NOMINAL.',
  '',
  'ACCESS GRANTED.',
];

export default function BootSequence() {
  const bootSeen = useUIStore((s) => s.bootSeen);
  const setBootSeen = useUIStore((s) => s.setBootSeen);
  const [visible, setVisible] = useState(() => !bootSeen);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;

    if (currentLine < bootLines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((c) => c + 1);
        setProgress(((currentLine + 1) / bootLines.length) * 100);
      }, 150 + Math.random() * 100);
      return () => clearTimeout(timeout);
    }

    // Boot complete, then dismiss
    const timeout = setTimeout(() => {
      setVisible(false);
      setBootSeen();
    }, 600);
    return () => clearTimeout(timeout);
  }, [visible, currentLine, setBootSeen]);

  const skip = useCallback(() => {
    setVisible(false);
    setBootSeen();
  }, [setBootSeen]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = () => skip();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, skip]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10001] bg-void flex flex-col items-center justify-center p-8"
          exit={{
            opacity: 0,
            filter: 'brightness(2) blur(8px)',
          }}
          transition={{ duration: 0.5 }}
          onClick={skip}
        >
          {/* Terminal output */}
          <div className="w-full max-w-xl font-mono text-sm">
            {bootLines.slice(0, currentLine).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`leading-relaxed ${
                  line.includes('OK')
                    ? 'text-green-terminal/80'
                    : line.includes('ACCESS GRANTED')
                    ? 'text-cyan font-bold'
                    : 'text-text-muted'
                }`}
              >
                {line}
              </motion.div>
            ))}
            <span className="inline-block w-2 h-3.5 bg-cyan animate-blink" />
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xl mt-8">
            <div className="h-[2px] bg-border-ghost overflow-hidden">
              <motion.div
                className="h-full bg-cyan"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-text-muted tracking-[0.15em]">
              <span>LOADING SYSTEMS</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Skip hint */}
          <div className="absolute bottom-8 font-mono text-[10px] text-text-muted/40 tracking-[0.15em]">
            PRESS ANY KEY TO SKIP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
