import Link from 'next/link';
import { ArrowLeft, ArrowRight, GraduationCap, MapPin } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { certifications } from '@/data/certifications';
import { experience } from '@/data/experience';
import { skillModules } from '@/data/skills';

const quickStats = [
  { label: 'Location', value: 'Islamabad, Pakistan' },
  { label: 'University', value: 'NUST' },
  { label: 'CGPA', value: '3.16 / 4.00' },
  { label: 'Focus', value: 'AI/ML, full-stack, systems' },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section className="page-hero section-container">
        <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden /> Back to home</Link>
        <p className="eyebrow">About</p>
        <h1>Engineer in progress, building across AI, web, and systems.</h1>
        <p>
          I am Furqan Ahmad Basra, a Computer Science student at NUST. My work moves between
          practical AI systems, full-stack products, data-heavy applications, and lower-level
          engineering projects such as search engines, compilers, and reliability simulators.
        </p>
      </section>

      <section className="section-container about-grid content-section">
        <div className="about-story">
          <h2>How I work</h2>
          <p>
            I like projects where the interface, data model, backend, and algorithmic core all have
            to fit together. That is why my portfolio includes RAG systems, real-time collaboration,
            ML analytics, custom indexing, compiler construction, and operating-system simulations.
          </p>
          <p>
            I care about clean implementation, readable UI, and proof that a system works. The best
            projects in this portfolio are not only demos; they show how I think through tradeoffs,
            performance, reliability, and user experience.
          </p>
          <div className="about-callout">
            <GraduationCap size={20} aria-hidden />
            <span>BS Computer Science at National University of Sciences and Technology, 2023 to present.</span>
          </div>
        </div>
        <aside className="profile-panel">
          <p className="panel-label">Profile</p>
          <div className="profile-facts">
            {quickStats.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="panel-divider" />
          <p className="panel-text"><MapPin size={16} aria-hidden /> Open to internships, junior software roles, and meaningful AI/full-stack collaborations.</p>
        </aside>
      </section>

      <section id="skills" className="section-container content-section split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">Skills</p>
          <h2>Technical range with a product mindset</h2>
          <p>These are the skill areas behind the projects, grouped into practical engineering modules.</p>
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

      <section className="section-container content-section">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Education, internship, and client work</h2>
        </div>
        <div className="timeline-clean">
          {experience.map((entry) => (
            <article key={entry.id} className="timeline-item-clean">
              <div>
                <span>{entry.timestamp}</span>
                <h3>{entry.title}</h3>
                <p>{entry.organization}</p>
              </div>
              <ul>{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container content-section credentials-section">
        <div className="section-heading">
          <p className="eyebrow">Certifications</p>
          <h2>Structured learning</h2>
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

      <section className="section-container page-bottom-cta">
        <Link href="/projects" className="button-primary">See all projects <ArrowRight size={17} aria-hidden /></Link>
      </section>
    </main>
  );
}
