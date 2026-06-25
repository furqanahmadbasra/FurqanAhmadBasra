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
      <div className="all-project-main">
        <div className="card-topline">
          <span>{categoryLabels[project.category]}</span>
          <span>{project.tech.slice(0, 3).join(' / ')}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p>{project.description}</p>
        <ul>
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
      <div className="all-project-side">
        <div className="tag-list">
          {project.tech.slice(0, 7).map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <Link href={`/work/${project.slug}`} className="text-link">
          Details <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </ReflectiveCard>
  );
}

export default function ProjectsPage() {
  return (
    <main className="site-shell relative">
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
