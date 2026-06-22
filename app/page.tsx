import Link from 'next/link';
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { LanyardCard } from '@/components/ui/LanyardCard';
import { featuredProjects, projects } from '@/data/projects';
import { skillModules } from '@/data/skills';
import { experience } from '@/data/experience';
import { certifications } from '@/data/certifications';

const coreSkills = [
  'AI/ML systems',
  'RAG applications',
  'Full-stack products',
  'Search engines',
  'Distributed systems',
  'Compiler projects',
];

const stats = [
  { value: '20+', label: 'Projects across AI, web, systems, and mobile' },
  { value: '50K+', label: 'Documents indexed in a custom C++ search engine' },
  { value: '92%', label: 'Accuracy reached in crop yield prediction models' },
  { value: '3', label: 'Focused certifications in web, Python, and ML' },
];

const selectedProjects = featuredProjects.slice(0, 5);
const additionalProjects = projects.filter((project) => !project.featured).slice(0, 6);

export default function Home() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section id="top" className="hero-section section-container">
        <div className="hero-copy">
          <p className="eyebrow">Computer Science student at NUST</p>
          <h1>Furqan Ahmad Basra</h1>
          <p className="hero-lede">
            I build practical AI, full-stack, and systems projects, from RAG document tools and
            real-time collaboration platforms to custom search engines, compilers, and ML analytics.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <Link className="button-primary" href="/projects">
              View All Projects <ArrowRight size={17} aria-hidden />
            </Link>
            <a className="button-secondary" href="mailto:furqanacc5785@gmail.com">
              <Mail size={17} aria-hidden /> Contact Me
            </a>
          </div>
          <div className="contact-strip" aria-label="Contact details">
            <span><MapPin size={15} aria-hidden /> Islamabad, Pakistan</span>
            <a href="mailto:furqanacc5785@gmail.com"><Mail size={15} aria-hidden /> Email</a>
            <a href="tel:+923346525807"><Phone size={15} aria-hidden /> +92 334 6525807</a>
          </div>
        </div>

        <div className="w-full h-full min-h-[500px] flex items-start justify-center pt-8">
          <LanyardCard 
            imageSrc="/your-picture.jpg" 
            backContent={
              <>
                <div>
                  <p className="panel-label font-mono text-xs uppercase tracking-wider text-blue-600 mb-4">Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {coreSkills.map((skill) => (
                      <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-200 my-6" />
                <div>
                  <p className="panel-label font-mono text-xs uppercase tracking-wider text-blue-600 mb-3">Currently</p>
                  <p className="panel-text text-sm text-slate-600 leading-relaxed">
                    BS Computer Science student with hands-on work in AI/ML, backend systems,
                    frontend interfaces, and software reliability.
                  </p>
                </div>
              </>
            }
          />
        </div>
      </section>

      <section className="stats-section section-container" aria-label="Portfolio highlights">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section id="work" className="section-container content-section">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Projects with real engineering depth</h2>
          <p>
            A focused set of projects showing AI pipelines, product thinking, data structures,
            real-time systems, and reliable backend architecture.
          </p>
        </div>

        <div className="project-grid">
          {selectedProjects.map((project, index) => (
            <article key={project.slug} className={index === 0 ? 'project-card project-card-featured' : 'project-card'}>
              <div className="card-topline">
                <span>{project.semester}</span>
                <span>{project.category.replace('-', ' / ')}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p>{project.description}</p>
              <ul>
                {project.highlights.slice(0, index === 0 ? 3 : 2).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="tag-list">
                {project.tech.slice(0, 6).map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <Link href={`/work/${project.slug}`} className="text-link">
                Read case study <ArrowRight size={15} aria-hidden />
              </Link>
            </article>
          ))}
        </div>

        <div className="compact-projects" aria-label="Additional projects">
          {additionalProjects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="compact-project">
              <span>{project.title}</span>
              <small>{project.tagline}</small>
            </Link>
          ))}
        </div>
      </section>

      <section id="skills" className="section-container content-section split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">Technical skills</p>
          <h2>A balanced stack for AI products and software systems</h2>
          <p>
            Comfortable moving between model workflows, APIs, databases, frontend interfaces,
            and lower-level systems work when the project needs it.
          </p>
        </div>
        <div className="skills-grid">
          {skillModules.map((module) => (
            <article key={module.id} className="skill-card-clean">
              <h3>{module.title.replaceAll('_', ' ').replace('&', ' & ')}</h3>
              <div className="tag-list">
                {module.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-container content-section">
        <div className="section-heading">
          <p className="eyebrow">Experience and education</p>
          <h2>Learning by building across the stack</h2>
        </div>
        <div className="timeline-clean">
          {experience.map((entry) => (
            <article key={entry.id} className="timeline-item-clean">
              <div>
                <span>{entry.timestamp}</span>
                <h3>{entry.title}</h3>
                <p>{entry.organization}</p>
              </div>
              <ul>
                {entry.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container content-section credentials-section">
        <div className="section-heading">
          <p className="eyebrow">Certifications</p>
          <h2>Structured learning that supports the project work</h2>
        </div>
        <div className="credentials-grid">
          {certifications.map((cert) => (
            <article key={cert.title} className="credential-card">
              <h3>{cert.title}</h3>
              <p>{cert.issuer} - {cert.platform}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-container contact-section">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something useful.</h2>
          <p>
            I&apos;m open to internships, junior software roles, AI/ML engineering work, frontend projects,
            and collaborations where thoughtful engineering matters.
          </p>
        </div>
        <div className="contact-card">
          <a href="mailto:furqanacc5785@gmail.com"><Mail size={18} aria-hidden /> furqanacc5785@gmail.com</a>
          <a href="tel:+923346525807"><Phone size={18} aria-hidden /> +92 334 6525807</a>
          <a href="https://github.com/furqanahmadbasra" target="_blank" rel="noreferrer"><ExternalLink size={18} aria-hidden /> GitHub</a>
          <a href="https://www.linkedin.com/in/furqan-ahmad-basra-1812b62a2/" target="_blank" rel="noreferrer"><ExternalLink size={18} aria-hidden /> LinkedIn</a>
        </div>
      </section>
    </main>
  );
}





