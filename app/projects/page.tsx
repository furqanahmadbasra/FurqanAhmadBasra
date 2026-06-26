'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { categoryLabels, projects, type Project } from '@/data/projects';
import { BlurText } from '@/components/interactive/BlurText';
import { ScrollReveal } from '@/components/interactive/ScrollReveal';
import { AnimatedList } from '@/components/interactive/AnimatedList';
import { ReflectiveCard } from '@/components/interactive/ReflectiveCard';
import { FadeContent } from '@/components/interactive/FadeContent';
import { ProjectsParticles } from '@/components/interactive/ProjectsParticles';

const semesterOrder = ['Semester 6', 'Semester 5', 'Semester 4', 'Semester 3', 'Semester 2', 'Semester 1', 'Additional'];

const groupedProjects = semesterOrder
  .map((semester) => ({
    semester,
    items: projects.filter((project) => project.semester === semester),
  }))
  .filter((group) => group.items.length > 0);

function ProjectRow({ project }: { project: Project }) {
  return (
    <ReflectiveCard className="all-project-card">
      <div className="all-project-card-header">
        <div className="all-project-card-title">
          <p className="project-tagline">{categoryLabels[project.category]}</p>
          <h3>{project.title}</h3>
        </div>
        <Link href={`/work/${project.slug}`} className="button-secondary">
          Read Case Study <ArrowRight size={14} aria-hidden className="ml-2 inline" />
        </Link>
      </div>
      
      <div className="all-project-card-body">
        <p>{project.description}</p>
        <ul className="mt-2 list-inside list-disc space-y-1" style={{ color: 'var(--muted)' }}>
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>

      <div className="all-project-card-footer">
        <div className="tag-list">
          {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
        </div>
      </div>
    </ReflectiveCard>
  );
}

export default function ProjectsPage() {
  return (
    <main className="site-shell relative min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
        <ProjectsParticles 
          particleColors={['#ffffff', '#a1a1aa', '#71717a']} 
          particleCount={3500} 
          particleSpread={8} 
          speed={0.03} 
          particleBaseSize={200} 
          alphaParticles={true} 
          disableRotation={false} 
          cameraDistance={15}
        />
      </div>
      <SiteNav />

      <section className="projects-hero section-container relative z-10">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} aria-hidden /> Back to home
        </Link>
        <FadeContent yOffset={10}>
          <p className="eyebrow">Complete project archive</p>
        </FadeContent>
        <BlurText text="All projects from my portfolio" />
        <FadeContent delay={0.4}>
          <p>
            A full view of the work from the portfolio document: AI/ML systems, full-stack platforms,
            data projects, low-level systems, security research, mobile apps, and early programming work.
          </p>
        </FadeContent>
        <FadeContent delay={0.6} className="archive-summary" aria-label="Project archive summary">
          <span>{projects.length} total projects</span>
          <span>{groupedProjects.length} project groups</span>
          <span>NUST coursework, internship, and client work</span>
        </FadeContent>
      </section>

      <section className="section-container project-archive relative z-10">
        {groupedProjects.map((group) => (
          <div key={group.semester} id={group.semester.toLowerCase().replaceAll(' ', '-')} className="project-group">
            <ScrollReveal className="project-group-heading">
              <div>
                <p className="eyebrow">{group.semester}</p>
                <h2>{group.items.length} {group.items.length === 1 ? 'project' : 'projects'}</h2>
              </div>
            </ScrollReveal>
            <AnimatedList className="all-project-list">
              {group.items.map((project) => <ProjectRow key={project.slug} project={project} />)}
            </AnimatedList>
          </div>
        ))}
      </section>
    </main>
  );
}
