'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { useState } from 'react';
import { categoryLabels, projects, type ProjectCategory } from '@/data/projects';

const categories: (ProjectCategory | 'all')[] = ['all', 'ai-ml', 'full-stack', 'systems', 'security', 'mobile'];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const filtered = activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="site-shell">
      <SiteNav />

      <section className="projects-hero section-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden /> Back to home</Link>
        <p className="eyebrow">Work</p>
        <h1>Project archive</h1>
        <p>
          Browse the same complete project set with a simple category filter. For the semester-by-semester
          view, use the full projects page.
        </p>
        <div className="hero-actions">
          <Link href="/projects" className="button-secondary">Semester view <ArrowRight size={17} aria-hidden /></Link>
        </div>
      </section>

      <section className="section-container content-section">
        <div className="filter-bar" aria-label="Project filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeFilter === category ? 'filter-pill active' : 'filter-pill'}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'All' : categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="project-grid archive-card-grid">
          {filtered.map((project) => (
            <article key={project.slug} className="project-card">
              <div className="card-topline">
                <span>{project.semester}</span>
                <span>{categoryLabels[project.category]}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tech.slice(0, 6).map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <Link href={`/work/${project.slug}`} className="text-link">Details <ArrowRight size={15} aria-hidden /></Link>
            </article>
          ))}
        </div>

        <p className="archive-count">Showing {filtered.length} of {projects.length} projects.</p>
      </section>
    </main>
  );
}
