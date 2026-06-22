'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import MagneticButton from '@/components/interactive/MagneticButton';
import Marquee from '@/components/interactive/Marquee';
import { featuredProjects, allProjects, categoryLabels, categoryColors, type ProjectCategory } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const categories: ProjectCategory[] = ['ai-ml', 'full-stack', 'systems', 'security', 'mobile'];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleX = useTransform(scrollYProgress, [0, 0.2], ['-5%', '0%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card-wrapper');
    gsap.from(cards, {
      opacity: 0,
      y: 80,
      rotationX: 8,
      scale: 0.94,
      stagger: { amount: 0.6, from: 'start' },
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  const filteredProjects = activeFilter === 'all'
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* Big decorative number */}
      <div
        className="absolute -top-8 right-8 font-display font-bold text-[20vw] text-text-muted/[0.02] pointer-events-none select-none leading-none"
        aria-hidden
      >
        04
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Title */}
        <motion.div style={{ x: titleX, opacity: titleOpacity }}>
          <SectionHeader index="04" label="PROJECT ARCHIVE" title="DEPLOYED PROCESSES" />
        </motion.div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => setActiveFilter('all')}
            className={`font-mono text-[11px] tracking-wider px-5 py-2.5 border transition-all duration-200 ${
              activeFilter === 'all'
                ? 'border-cyan text-cyan bg-cyan/10'
                : 'border-border-ghost text-text-muted hover:border-cyan/40 hover:text-cyan'
            }`}
          >
            ALL SYSTEMS
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="font-mono text-[11px] tracking-wider px-5 py-2.5 border transition-all duration-200"
              style={{
                borderColor: activeFilter === cat ? categoryColors[cat] : `${categoryColors[cat]}30`,
                color: categoryColors[cat],
                backgroundColor: activeFilter === cat ? `${categoryColors[cat]}15` : 'transparent',
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Project grid — real gaps */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: '1200px' }}
        >
          {/* Hero card spans 2 cols */}
          <div className="project-card-wrapper md:col-span-2">
            <ProjectCard project={featuredProjects[0]} index={0} featured />
          </div>
          {filteredProjects.slice(1, 5).map((proj, i) => (
            <div key={proj.slug} className="project-card-wrapper">
              <ProjectCard project={proj} index={i + 1} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mt-16 pt-10 border-t border-border-ghost">
          <MagneticButton href="/work">
            VIEW ALL {allProjects?.length ?? 16}+ PROCESSES → /work
          </MagneticButton>
          <span className="font-mono text-[11px] text-text-muted tracking-wider">
            {allProjects?.length ?? 16} projects across AI/ML, Full-Stack, Systems &amp; more
          </span>
        </div>
      </div>

      {/* Marquee separator */}
      <div className="mt-24 border-t border-border-ghost">
        <Marquee reverse speed={30} className="py-4 bg-graphite/20">
          <div className="flex gap-12 px-6">
            {['CLUTCH.AI', 'FLOWRA', 'SEARCH ENGINE', 'DOC INTELLIGENCE', 'DREAMHOME', 'COMPILER', 'ECC SIMULATOR', 'AI FIREWALL'].map((name, i) => (
              <span
                key={i}
                className="font-mono text-[10px] tracking-wider text-text-muted/30 whitespace-nowrap"
              >
                {name} <span className="text-cyan/20">{'//'}</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
