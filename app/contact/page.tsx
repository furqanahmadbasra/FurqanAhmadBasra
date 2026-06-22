import Link from 'next/link';
import { ArrowLeft, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
const contactLinks = [
  { label: 'Email', value: 'furqanacc5785@gmail.com', href: 'mailto:furqanacc5785@gmail.com', icon: Mail },
  { label: 'Phone', value: '+92 334 6525807', href: 'tel:+923346525807', icon: Phone },
  { label: 'GitHub', value: 'github.com/furqanahmadbasra', href: 'https://github.com/furqanahmadbasra', icon: ExternalLink },
  { label: 'LinkedIn', value: 'linkedin.com/in/furqan-ahmad-basra', href: 'https://www.linkedin.com/in/furqan-ahmad-basra-1812b62a2/', icon: ExternalLink },
];

export default function ContactPage() {
  return (
    <main className="site-shell">
      <SiteNav />

      <section className="section-container contact-page-shell">
        <div className="contact-page-copy">
          <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden /> Back to home</Link>
          <p className="eyebrow">Contact</p>
          <h1>Let&apos;s build something useful.</h1>
          <p>
            I am open to internships, junior software engineering roles, AI/ML projects,
            frontend work, and collaborations where clear thinking and careful execution matter.
          </p>
          <div className="contact-location"><MapPin size={17} aria-hidden /> Islamabad, Pakistan</div>
        </div>

        <div className="contact-card large-contact-card">
          {contactLinks.map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
              <item.icon size={18} aria-hidden />
              <span><strong>{item.label}</strong>{item.value}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

