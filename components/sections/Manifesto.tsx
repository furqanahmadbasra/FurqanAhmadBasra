'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';
import GlitchText from '@/components/interactive/GlitchText';

gsap.registerPlugin(ScrollTrigger);

const terminalLines = [
  'INITIALIZING NEURAL MODULES...',
  '> loading knowledge_graph.db ... OK',
  '> mounting rag_pipeline.svc .... OK',
  '> search_engine.idx: 50,000 docs',
  '> crdt_sync_engine: LISTENING',
  '> compiler_backend: COMPILED',
  'STATUS: ALL MODULES NOMINAL',
  'ACCESS LEVEL: OPERATOR',
];

const pillars = [
  {
    icon: '◈',
    color: '#00F5FF',
    title: 'AI / ML SYSTEMS',
    desc: 'RAG pipelines, transformer fine-tuning, NLP at scale. Custom architectures from GRUs to multi-agent LLM chains.',
  },
  {
    icon: '◉',
    color: '#7B2FF7',
    title: 'FULL-STACK PLATFORMS',
    desc: 'React, Next.js, Node.js with real-time WebSocket layers, PostgreSQL, Redis, and Docker-orchestrated deployments.',
  },
  {
    icon: '◊',
    color: '#FFB200',
    title: 'SYSTEMS ENGINEERING',
    desc: 'C++ search engines, CRDT sync algorithms, custom compilers, and hardware simulators built from first principles.',
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textX = useTransform(scrollYProgress, [0, 0.3], ['-8%', '0%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const termX = useTransform(scrollYProgress, [0.05, 0.35], ['8%', '0%']);
  const termOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const pillarsY = useTransform(scrollYProgress, [0.35, 0.7], ['60px', '0px']);
  const pillarsOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);

  useGSAP(() => {
    if (!pillarsRef.current) return;
    const cards = pillarsRef.current.querySelectorAll('.pillar-card');
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: pillarsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-40 md:py-56 overflow-hidden"
    >
      {/* Decorative bg text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[22vw] text-text-muted/[0.015] whitespace-nowrap pointer-events-none select-none leading-none"
        aria-hidden
      >
        SYSTEMS
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        <SectionHeader index="02" label="KERNEL.LOG" title="MANIFESTO" />

        {/* ── Row 1: Text + Terminal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 lg:gap-24 items-start mb-36">
          {/* Text content */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            style={{ x: textX, opacity: textOpacity }}
          >
            <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.15] text-text-primary">
              I build systems that{' '}
              <GlitchText className="text-cyan">think</GlitchText>,{' '}
              <GlitchText className="text-violet">learn</GlitchText>, and{' '}
              <GlitchText className="text-amber">scale</GlitchText>.
            </p>

            <p className="text-lg text-text-muted leading-[2] max-w-xl">
              From custom C++ search engines indexing 50,000 documents to real-time RAG pipelines
              that listen, understand, and respond — I engineer the entire stack.
            </p>

            <p className="text-base text-text-muted/70 leading-[1.9] max-w-xl">
              My work spans compilers, neural networks, distributed systems, and full-stack platforms.
              Every project is built from first principles, optimized for performance, and designed
              to solve real problems at scale.
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-3 pt-4">
              {['First Principles', 'Performance-First', 'End-to-End', 'Production-Grade'].map((kw) => (
                <span
                  key={kw}
                  className="font-mono text-[10px] tracking-[0.14em] px-4 py-2 border border-border-ghost text-text-muted hover:border-cyan/40 hover:text-cyan transition-colors"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Terminal Window */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            style={{ x: termX, opacity: termOpacity }}
          >
            <TerminalWindow title="~/kernel.log" lines={terminalLines} />

            {/* Mini metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'AVG LATENCY', value: '< 3ms' },
                { label: 'UPTIME SLA', value: '99.9%' },
                { label: 'TEST COVERAGE', value: '94%' },
                { label: 'BUILD STATUS', value: 'PASSING' },
              ].map((m) => (
                <div key={m.label} className="bg-graphite/60 border border-border-ghost px-4 py-3">
                  <div className="font-mono text-[9px] text-text-muted tracking-[0.12em] mb-1">{m.label}</div>
                  <div className="font-mono text-sm text-cyan font-semibold">{m.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Pillars ── */}
        <motion.div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ y: pillarsY, opacity: pillarsOpacity }}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              className="pillar-card bg-graphite/40 border border-border-ghost hover:border-current/20 transition-colors duration-300 p-8 group"
            >
              <div className="text-4xl mb-6" style={{ color: p.color }}>{p.icon}</div>
              <div
                className="font-mono text-xs tracking-[0.14em] font-semibold mb-4"
                style={{ color: p.color }}
              >
                {p.title}
              </div>
              <p className="text-sm text-text-muted leading-[1.9]">{p.desc}</p>

              <div
                className="h-[1px] mt-8 w-0 group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: p.color, opacity: 0.4 }}
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-28 border-b border-border-ghost" />
      </div>
    </section>
  );
}
