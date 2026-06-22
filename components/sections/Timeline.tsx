'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';
import StatusBadge from '@/components/ui/StatusBadge';
import { experience } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);

  useGSAP(() => {
    const entries = sectionRef.current?.querySelectorAll('.timeline-entry') || [];
    entries.forEach((entry, i) => {
      const fromLeft = i % 2 === 0;
      gsap.from(entry, {
        opacity: 0,
        x: fromLeft ? -60 : 60,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="timeline" ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* Big BG number */}
      <div
        className="absolute -top-4 left-8 font-display font-bold text-[22vw] text-text-muted/[0.02] pointer-events-none select-none leading-none"
        aria-hidden
      >
        05
      </div>

      <div className="max-w-4xl mx-auto px-8 md:px-16">
        <SectionHeader index="05" label="CHANGELOG & CREDENTIALS" title="EXECUTION LOG" />

        <motion.p
          className="font-mono text-sm text-text-muted mb-20 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {'> '} chronological log of deployments, roles, and executions.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Animated gradient vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-border-ghost overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyan via-violet to-transparent origin-top"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          {/* Entries */}
          <div className="space-y-5">
            {experience.map((entry) => {
              const isExpanded = expanded === entry.id;
              return (
                <div key={entry.id} className="timeline-entry relative pl-20">
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-[18px] top-6 w-4 h-4 border-2 z-10 transition-all duration-300"
                    animate={{
                      borderColor: isExpanded ? '#00F5FF' : '#7C8694',
                      backgroundColor: isExpanded ? '#00F5FF' : 'transparent',
                      boxShadow: isExpanded
                        ? '0 0 0 5px rgba(0,245,255,0.12), 0 0 14px rgba(0,245,255,0.5)'
                        : 'none',
                    }}
                  />

                  {/* Entry card */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : entry.id)}
                    className="w-full text-left card-brutalist p-7 hover:bg-graphite/70 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-cyan">
                          {isExpanded ? 'v' : '>'}
                        </span>
                        <span className="font-mono text-sm text-text-primary font-semibold tracking-wide">
                          [{entry.timestamp}]
                        </span>
                      </div>
                      <StatusBadge
                        status={entry.status === 'COMPLETED' ? 'completed' : 'in-progress'}
                        label={entry.status}
                      />
                    </div>

                    <div className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
                      {entry.title}
                    </div>
                    <div className="font-mono text-xs text-text-muted tracking-wider">
                      @ {entry.organization}
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-5 border-t border-border-ghost space-y-3">
                            {entry.details.map((detail, i) => (
                              <motion.div
                                key={i}
                                className="font-mono text-sm text-text-muted flex items-start gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <span className="text-green-terminal shrink-0 mt-0.5">{'>'}</span>
                                <span className="leading-relaxed">{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 border-b border-border-ghost" />
      </div>
    </section>
  );
}
