'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import { certifications } from '@/data/certifications';
import Marquee from '@/components/interactive/Marquee';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.93, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(57, 255, 20, 0.035) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-8 md:px-16 mb-16"
        style={{ scale: sectionScale, opacity: sectionOpacity }}
      >
        <SectionHeader index="06" label="CREDENTIALS.LIST" title="VERIFIED MODULES" />

        <p className="font-mono text-sm text-text-muted mb-6 leading-relaxed max-w-xl">
          {'> '} {certifications.length} certifications verified across cloud, AI/ML, security, and development.
        </p>
      </motion.div>

      {/* First row: forward */}
      <Marquee speed={22} className="py-4 border-t border-border-ghost">
        <div className="flex gap-5 px-6">
          {[...certifications].map((cert, i) => (
            <motion.div
              key={`a-${i}`}
              className="flex items-center gap-4 px-6 py-4 card-brutalist bg-void shrink-0 min-w-[260px]"
              whileHover={{
                borderColor: '#39FF14',
                backgroundColor: 'rgba(57, 255, 20, 0.04)',
                y: -2,
              }}
              transition={{ duration: 0.15 }}
            >
              <CheckCircle size={14} className="text-green-terminal shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs text-text-primary tracking-wide truncate leading-snug">
                  {cert.title}
                </div>
                <div className="font-mono text-[10px] text-text-muted tracking-wider mt-1.5 truncate">
                  {cert.issuer} · {cert.platform}
                </div>
              </div>
              <span className="font-mono text-[9px] text-green-terminal tracking-[0.15em] ml-2 shrink-0">
                ✓ VRF
              </span>
            </motion.div>
          ))}
        </div>
      </Marquee>

      {/* Second row: reverse */}
      <Marquee reverse speed={18} className="py-4 border-t border-border-ghost mt-4">
        <div className="flex gap-5 px-6">
          {[...certifications].reverse().map((cert, i) => (
            <motion.div
              key={`b-${i}`}
              className="flex items-center gap-4 px-6 py-3.5 card-brutalist bg-graphite/40 shrink-0 min-w-[220px]"
              whileHover={{
                borderColor: '#00F5FF',
                backgroundColor: 'rgba(0, 245, 255, 0.04)',
                y: -2,
              }}
              transition={{ duration: 0.15 }}
            >
              <div className="font-mono text-[9px] text-cyan tracking-wider shrink-0">MODULE</div>
              <div className="font-mono text-[10px] text-text-muted tracking-wide truncate flex-1">
                {cert.title.split(' ').slice(0, 4).join(' ')}
              </div>
            </motion.div>
          ))}
        </div>
      </Marquee>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: certifications.length, label: 'TOTAL CERTS' },
            { n: 3, label: 'CLOUD PROVIDERS' },
            { n: 4, label: 'AI/ML CERTS' },
            { n: 2, label: 'YEARS ACTIVE' },
          ].map(({ n, label }) => (
            <div key={label} className="bg-graphite/40 border border-border-ghost px-6 py-6 text-center">
              <div className="font-display font-bold text-4xl text-green-terminal mb-2">{n}</div>
              <div className="font-mono text-[10px] tracking-[0.14em] text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-24">
        <div className="border-b border-border-ghost" />
      </div>
    </section>
  );
}
