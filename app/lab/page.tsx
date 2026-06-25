'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Beaker, BookOpen, CheckCircle } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { projects } from '@/data/projects';
import { BlurText } from '@/components/interactive/BlurText';
import { FadeContent } from '@/components/interactive/FadeContent';
import { TiltedCard } from '@/components/interactive/TiltedCard';
import { Magnet } from '@/components/interactive/Magnet';
import { ScrollReveal } from '@/components/interactive/ScrollReveal';

const experiments = projects.filter((project) =>
  ['tic-tac-toe', 'laptop-store-management', 'fifa-analytics', 'information-security-risk-assessment'].includes(project.slug)
);

const currentlyExploring = [
  'Advanced RAG architectures with better retrieval quality',
  'Multi-agent AI systems for software and workflow automation',
  'Production-grade developer tools for AI pipelines',
  'High-performance browser applications and realtime interfaces',
];

export default function LabPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section className="page-hero section-container">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} aria-hidden /> Back to home
        </Link>
        <FadeContent yOffset={10}>
          <p className="eyebrow">Lab</p>
        </FadeContent>
        <BlurText text="Experiments, learning notes, and smaller builds." />
        <FadeContent delay={0.4}>
          <p>
            A lighter page for experiments and learning directions. The complete polished project archive
            is available on the projects page.
          </p>
        </FadeContent>
        <div className="hero-actions">
          <Magnet strength={0.15}>
            <Link href="/projects" className="button-primary">
              Open project archive <ArrowRight size={17} aria-hidden />
            </Link>
          </Magnet>
        </div>
      </section>

      <section className="section-container content-section lab-grid">
        <ScrollReveal>
          <TiltedCard className="detail-card h-full">
            <div className="section-icon-heading">
              <BookOpen size={18} aria-hidden />
              <h2>Currently exploring</h2>
            </div>
            <ul>
              {currentlyExploring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TiltedCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TiltedCard className="detail-card h-full">
            <div className="section-icon-heading">
              <Beaker size={18} aria-hidden />
              <h2>Experiment archive</h2>
            </div>
            <div className="mini-project-list">
              {experiments.map((project) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="mini-project-card">
                  <span>
                    <CheckCircle size={15} aria-hidden /> Complete
                  </span>
                  <strong>{project.title}</strong>
                  <small>{project.tagline}</small>
                </Link>
              ))}
            </div>
          </TiltedCard>
        </ScrollReveal>
      </section>
    </main>
  );
}
