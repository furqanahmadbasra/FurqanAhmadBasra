'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillGauge from '@/components/ui/SkillGauge';
import StatusBadge from '@/components/ui/StatusBadge';
import { skillModules } from '@/data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsArchitecture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerScale = useTransform(scrollYProgress, [0, 0.2], [0.92, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.skill-card');

    cards.forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.from(card, {
        opacity: 0,
        x: fromLeft ? -60 : 60,
        y: 30,
        scale: 0.93,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* Background connector line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan/8 to-transparent pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div style={{ scale: headerScale, opacity: headerOpacity }}>
          <SectionHeader index="03" label="TECHNICAL CAPABILITIES" title="SYSTEM ARCHITECTURE" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-sm text-text-muted max-w-lg mb-20 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {'> '} 9 active modules · full-spectrum engineering from AI inference to bare-metal systems.
        </motion.p>

        {/* Skill modules grid — real gaps instead of hairlines */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillModules.map((module, i) => (
            <div
              key={module.id}
              className="skill-card bg-graphite/50 border border-border-ghost hover:border-cyan/25 hover:bg-graphite/80 transition-all duration-300 p-0 group cursor-default"
            >
              {/* Module header */}
              <div
                className="flex items-center justify-between px-6 py-4 border-b border-border-ghost"
                style={{ backgroundColor: 'rgba(0, 245, 255, 0.03)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-text-muted/40">
                    MOD-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs tracking-[0.1em] text-cyan font-semibold">
                    {module.title}
                  </span>
                </div>
                <StatusBadge status="online" label="ONLINE" />
              </div>

              {/* Skills tags + gauge */}
              <div className="px-6 pt-6 pb-7">
                <div className="flex flex-wrap gap-2 mb-6">
                  {module.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] tracking-wider px-2.5 py-1 text-text-muted border border-border-ghost hover:border-cyan/40 hover:text-cyan transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <SkillGauge label="PROFICIENCY" value={module.proficiency} color="#FFB200" />

                <div className="h-[1px] mt-6 w-0 group-hover:w-full transition-all duration-700 bg-cyan/25" />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-16 flex flex-wrap gap-10 font-mono text-[10px] tracking-[0.15em] text-text-muted">
          <span><span className="text-green-terminal">■</span> ONLINE — active module</span>
          <span><span className="text-amber">■</span> GAUGE — proficiency level</span>
          <span><span className="text-cyan">■</span> TAG — skill identifier</span>
        </div>

        <div className="mt-24 border-b border-border-ghost" />
      </div>
    </section>
  );
}
