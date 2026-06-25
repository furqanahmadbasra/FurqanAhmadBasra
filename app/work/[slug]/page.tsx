import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Target } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { categoryLabels, projects, type Project } from '@/data/projects';
import { BlurText } from '@/components/interactive/BlurText';
import { Magnet } from '@/components/interactive/Magnet';
import { ScrollReveal } from '@/components/interactive/ScrollReveal';
import { FadeContent } from '@/components/interactive/FadeContent';
import { ReflectiveCard } from '@/components/interactive/ReflectiveCard';
import { ScrambledText } from '@/components/interactive/ScrambledText';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const focusByCategory: Record<Project['category'], string> = {
  'ai-ml': 'AI workflow design, model integration, retrieval quality, and practical user-facing intelligence.',
  'full-stack': 'Product architecture, responsive interfaces, API design, persistence, and workflow reliability.',
  systems: 'Algorithmic design, performance, reliability, parsing, indexing, and lower-level implementation choices.',
  security: 'Threat modeling, risk analysis, anomaly detection, and security-focused documentation.',
  mobile: 'Cross-platform interaction design, authentication, realtime data, and polished mobile UX.',
};

function getProjectPosition(slug: string) {
  const index = projects.findIndex((item) => item.slug === slug);
  return {
    index,
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const { index, previous, next } = getProjectPosition(slug);

  return (
    <main className="site-shell">
      <SiteNav />

      <article className="section-container project-detail-page">
        <Link href="/projects" className="back-link">
          <ArrowLeft size={16} aria-hidden /> Back to all projects
        </Link>

        <header className="project-detail-heading case-study-heading">
          <FadeContent yOffset={10}>
            <p className="eyebrow">{project.semester} / {categoryLabels[project.category]}</p>
          </FadeContent>
          <BlurText text={project.title} />
          <FadeContent delay={0.4}>
            <p>{project.tagline}</p>
          </FadeContent>
          <div className="detail-actions" aria-label="Project movement">
            <Magnet strength={0.1}>
              <Link href={`/work/${previous.slug}`} className="button-secondary">
                <ArrowLeft size={17} aria-hidden /> Previous project
              </Link>
            </Magnet>
            <Magnet strength={0.1}>
              <Link href={`/work/${next.slug}`} className="button-primary">
                Next project <ArrowRight size={17} aria-hidden />
              </Link>
            </Magnet>
          </div>
        </header>

        <ScrollReveal>
          <section className="case-study-grid" aria-label="Project case study summary">
            <div className="detail-card detail-card-large">
              <div className="section-icon-heading">
                <Target size={18} aria-hidden />
                <h2>Project overview</h2>
              </div>
              <p>{project.description}</p>
              <p>{focusByCategory[project.category]}</p>
            </div>

            <aside className="detail-card project-facts-card" aria-label="Project facts">
              <div>
                <span>Project</span>
                <strong>
                  <ScrambledText text={`${index + 1} of ${projects.length}`} speed={30} />
                </strong>
              </div>
              <div>
                <span>Timeline</span>
                <strong>
                  <ScrambledText text={project.semester} speed={30} />
                </strong>
              </div>
              <div>
                <span>Category</span>
                <strong>
                  <ScrambledText text={categoryLabels[project.category]} speed={30} />
                </strong>
              </div>
              <div>
                <span>Main stack</span>
                <strong>
                  <ScrambledText text={project.tech.slice(0, 3).join(', ')} speed={30} />
                </strong>
              </div>
            </aside>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="detail-card">
            <div className="section-icon-heading">
              <CheckCircle2 size={18} aria-hidden />
              <h2>Key work</h2>
            </div>
            <ul className="highlight-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="detail-card">
            <div className="section-icon-heading">
              <Layers size={18} aria-hidden />
              <h2>Technology stack</h2>
            </div>
            <div className="tag-list detail-tags">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <nav className="project-neighbors" aria-label="Previous and next project">
          <ReflectiveCard className="neighbor-card border border-line rounded-[8px] bg-surface h-full">
            <Link href={`/work/${previous.slug}`} className="neighbor-link neighbor-prev h-full" style={{ border: 0, background: 'transparent', margin: 0 }}>
              <span>Previous project</span>
              <strong>{previous.title}</strong>
              <small>{previous.tagline}</small>
            </Link>
          </ReflectiveCard>
          <ReflectiveCard className="neighbor-card border border-line rounded-[8px] bg-surface h-full">
            <Link href={`/work/${next.slug}`} className="neighbor-link neighbor-next h-full" style={{ border: 0, background: 'transparent', margin: 0 }}>
              <span>Next project</span>
              <strong>{next.title}</strong>
              <small>{next.tagline}</small>
              <ArrowRight size={16} aria-hidden />
            </Link>
          </ReflectiveCard>
        </nav>
      </article>
    </main>
  );
}