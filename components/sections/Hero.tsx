'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Marquee from '@/components/interactive/Marquee';
import MagneticButton from '@/components/interactive/MagneticButton';

const NeuralCore = dynamic(() => import('@/components/three/NeuralCore'), { ssr: false });
const ParticleNetwork = dynamic(() => import('@/components/interactive/ParticleNetwork'), { ssr: false });

const techStack = [
  'NEXT.JS', 'REACT', 'PYTHON', 'PYTORCH', 'C++', 'RAG PIPELINES',
  'CRDT', 'WEBSOCKETS', 'DOCKER', 'TYPESCRIPT', 'NLP', 'DEEP LEARNING',
  'CHROMADB', 'POSTGRESQL', 'NODE.JS', 'SOCKET.IO', 'LANGCHAIN', 'FASTAPI',
];

const stats = [
  { value: '16+', label: 'SYSTEMS BUILT' },
  { value: '50K', label: 'DOCS INDEXED' },
  { value: '3+', label: 'YEARS EXP' },
  { value: '8+', label: 'CERTS EARNED' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const coreY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [0.05, 0]);
  const statsY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* ── Grid bg ── */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: gridScale, opacity: gridOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* ── 3D Neural Core + Particles ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y: coreY }}
      >
        <ParticleNetwork />
        <NeuralCore />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.35) 0%, rgba(123, 47, 247, 0.25) 45%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Corner decorations ── */}
      <div className="absolute top-20 left-8 font-mono text-[10px] text-text-muted/40 tracking-[0.15em] pointer-events-none">
        [ OPERATOR.SYS v2.6 ]
      </div>
      <div className="absolute top-20 right-8 font-mono text-[10px] text-text-muted/40 tracking-[0.15em] pointer-events-none text-right">
        NUST — PKT 31.4N 73.1E
      </div>

      {/* ── Main hero content ── */}
      <motion.div
        className="relative z-10 text-center px-8 w-full max-w-7xl mx-auto"
        style={{ y: nameY, opacity: nameOpacity }}
      >
        {/* System label */}
        <motion.div
          className="text-label mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          [ 01 {'//'} BOOT.SYS ] - WELCOME TO FAB-OS
        </motion.div>

        {/* Massive name */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="text-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.88] text-text-primary"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">FURQAN</span>
            <span className="block">AHMAD</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #00F5FF 0%, #7B2FF7 50%, #FF2E9A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BASRA
            </span>
          </motion.h1>
        </div>

        {/* Role tagline */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="font-mono text-sm md:text-base tracking-[0.14em] text-text-muted mb-3">
            AI/ML ENGINEER <span className="text-cyan mx-2">{'//'}</span> FULL-STACK DEVELOPER <span className="text-cyan mx-2">{'//'}</span> SYSTEMS BUILDER
          </p>
          <p className="font-mono text-xs text-text-muted/40 tracking-[0.2em]">
            NUST / Islamabad / Open to Opportunities
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <MagneticButton
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            EXPLORE SYSTEMS →
          </MagneticButton>
          <a
            href="/about"
            className="font-mono text-xs tracking-wider text-text-muted hover:text-cyan transition-colors border border-border-ghost hover:border-cyan/40 px-8 py-4 inline-flex items-center"
          >
            [ READ MANIFEST ]
          </a>
        </motion.div>
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div
        className="absolute bottom-28 left-0 right-0 z-10 px-8"
        style={{ y: statsY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="max-w-lg mx-auto grid grid-cols-4 gap-[1px] bg-border-ghost">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-void px-4 py-5 text-center">
              <div className="font-display font-bold text-3xl text-cyan mb-1">{stat.value}</div>
              <div className="font-mono text-[9px] tracking-[0.14em] text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Floating terminals ── */}
      <motion.div
        className="absolute top-[22%] right-[5%] hidden xl:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        style={{ animation: 'float 8s ease-in-out infinite' }}
      >
        <div className="terminal-window p-0 w-[220px]">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border-ghost">
            <div className="w-2 h-2 rounded-full bg-red-hazard/60" />
            <div className="w-2 h-2 rounded-full bg-amber/60" />
            <div className="w-2 h-2 rounded-full bg-green-terminal/60" />
            <span className="font-mono text-[9px] text-text-muted ml-2">whoami</span>
          </div>
          <div className="p-4 space-y-1.5 font-mono text-[10px] text-text-muted">
            <div className="text-cyan/70">~/fab-os $ whoami</div>
            <div>furqan.basra@nust</div>
            <div className="text-cyan/70 mt-2">~/fab-os $ status</div>
            <div className="text-green-terminal/70">NEURAL_LINK: ACTIVE</div>
            <div className="text-amber/70">RAG_PIPELINE: ONLINE</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] left-[4%] hidden xl:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1.2, delay: 1.8 }}
        style={{ animation: 'float 10s ease-in-out infinite 2s' }}
      >
        <div className="terminal-window p-0 w-[210px]">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border-ghost">
            <span className="font-mono text-[9px] text-text-muted">sys.log</span>
          </div>
          <div className="p-4 space-y-1.5 font-mono text-[10px] text-text-muted">
            <div className="text-amber/70">[SYS] 50,000 docs indexed</div>
            <div className="text-green-terminal/70">[OK] Search: 0.003s avg</div>
            <div className="text-cyan/70">[NET] WebSocket ACTIVE</div>
            <div className="text-violet/70">[AI] LLM Chain READY</div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom marquee ticker ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border-ghost">
        <Marquee speed={35} className="py-3 bg-graphite/40 backdrop-blur-sm">
          <div className="flex gap-12 px-6">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[10px] tracking-[0.12em] text-text-muted/50 whitespace-nowrap"
              >
                {tech} <span className="text-cyan/25">{'//'}</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="font-mono text-[9px] tracking-[0.25em] text-text-muted/30">SCROLL</span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-cyan/50 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
