import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Target } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { categoryLabels, projects, type Project } from '@/data/projects';

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
        <Link href="/projects" className="back-link"><ArrowLeft size={16} aria-hidden /> Back to all projects</Link>

        <header className="project-detail-heading case-study-heading">
          <p className="eyebrow">{project.semester} / {categoryLabels[project.category]}</p>
          <h1>{project.title}</h1>
          <p>{project.tagline}</p>
          <div className="detail-actions" aria-label="Project movement">
            <Link href={`/work/${previous.slug}`} className="button-secondary"><ArrowLeft size={17} aria-hidden /> Previous project</Link>
            <Link href={`/work/${next.slug}`} className="button-primary">Next project <ArrowRight size={17} aria-hidden /></Link>
          </div>
        </header>

        <section className="case-study-grid" aria-label="Project case study summary">
          <div className="detail-card detail-card-large">
            <div className="section-icon-heading"><Target size={18} aria-hidden /><h2>Project overview</h2></div>
            <p>{project.description}</p>
            <p>{focusByCategory[project.category]}</p>
          </div>

          <aside className="detail-card project-facts-card" aria-label="Project facts">
            <div>
              <span>Project</span>
              <strong>{index + 1} of {projects.length}</strong>
            </div>
            <div>
              <span>Timeline</span>
              <strong>{project.semester}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{categoryLabels[project.category]}</strong>
            </div>
            <div>
              <span>Main stack</span>
              <strong>{project.tech.slice(0, 3).join(', ')}</strong>
            </div>
          </aside>
        </section>

        <section className="detail-card">
          <div className="section-icon-heading"><CheckCircle2 size={18} aria-hidden /><h2>Key work</h2></div>
          <ul className="highlight-list">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </section>

        <section className="detail-card">
          <div className="section-icon-heading"><Layers size={18} aria-hidden /><h2>Technology stack</h2></div>
          <div className="tag-list detail-tags">
            {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </section>

        <nav className="project-neighbors" aria-label="Previous and next project">
          <Link href={`/work/${previous.slug}`} className="neighbor-link neighbor-prev">
            <span>Previous project</span>
            <strong>{previous.title}</strong>
            <small>{previous.tagline}</small>
          </Link>
          <Link href={`/work/${next.slug}`} className="neighbor-link neighbor-next">
            <span>Next project</span>
            <strong>{next.title}</strong>
            <small>{next.tagline}</small>
            <ArrowRight size={16} aria-hidden />
          </Link>
        </nav>
      </article>
    </main>
  );
}