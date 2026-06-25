'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { BlurText } from '@/components/interactive/BlurText';
import { FadeContent } from '@/components/interactive/FadeContent';
import { Magnet } from '@/components/interactive/Magnet';

import { GradientText } from '@/components/interactive/GradientText';
import { Silk } from '@/components/interactive/Silk';

const contactLinks = [
  { label: 'Email', value: 'furqanacc5785@gmail.com', href: 'mailto:furqanacc5785@gmail.com', icon: Mail },
  { label: 'Phone', value: '+92 334 6525807', href: 'tel:+923346525807', icon: Phone },
  { label: 'GitHub', value: 'github.com/furqanahmadbasra', href: 'https://github.com/furqanahmadbasra', icon: ExternalLink },
  { label: 'LinkedIn', value: 'linkedin.com/in/furqan-ahmad-basra', href: 'https://www.linkedin.com/in/furqan-ahmad-basra-1812b62a2/', icon: ExternalLink },
];

export default function ContactPage() {
  return (
    <main className="site-shell relative">
      <Silk />
      <SiteNav />

      <section className="section-container contact-page-shell relative z-10">
        <div className="contact-page-copy">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Back to home
          </Link>
          <FadeContent yOffset={10}>
            <p className="eyebrow">Contact</p>
          </FadeContent>
          <h1>
            <GradientText colors={['#2563eb', '#3b82f6', '#1d4ed8']}>Let&apos;s build something useful.</GradientText>
          </h1>
          <FadeContent delay={0.4}>
            <p>
              I am open to internships, junior software engineering roles, AI/ML projects,
              frontend work, and collaborations where clear thinking and careful execution matter.
            </p>
          </FadeContent>
          <FadeContent delay={0.6} className="contact-location">
            <MapPin size={17} aria-hidden /> Islamabad, Pakistan
          </FadeContent>
        </div>

        <div className="contact-card large-contact-card">
          {contactLinks.map((item) => (
            <Magnet key={item.label} strength={0.08} className="w-full">
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="w-full h-full flex items-center"
              >
                <item.icon size={18} aria-hidden />
                <span>
                  <strong>{item.label}</strong>
                  {item.value}
                </span>
              </a>
            </Magnet>
          ))}
        </div>
      </section>
    </main>
  );
}

