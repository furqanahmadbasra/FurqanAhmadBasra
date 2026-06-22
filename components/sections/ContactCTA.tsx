'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MagneticButton from '@/components/interactive/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: FaGithub, label: 'github', value: 'github.com/furqanahmadbasra', href: 'https://github.com/furqanahmadbasra', color: '#00F5FF' },
  { icon: FaLinkedin, label: 'linkedin', value: 'linkedin.com/in/furqan-ahmad-basra', href: 'https://linkedin.com/in/furqan-ahmad-basra-1812b62a2', color: '#7B2FF7' },
  { icon: Mail, label: 'email', value: 'furqanacc5785@gmail.com', href: 'mailto:furqanacc5785@gmail.com', color: '#FFB200' },
  { icon: Phone, label: 'phone', value: '+92 334 6525807', href: 'tel:+923346525807', color: '#39FF14' },
];

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.25], ['50px', '0px']);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useGSAP(() => {
    gsap.from('.social-link', {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.socials-container',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-40 md:py-56 px-8 md:px-16 overflow-hidden">
      {/* Big glowing background text */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display font-bold text-[16vw] text-cyan/[0.02] whitespace-nowrap pointer-events-none select-none leading-none"
        aria-hidden
      >
        CONNECT
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 245, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="text-label mb-10">[ 07 // UPLINK.TERMINAL ]</div>

        {/* Giant heading */}
        <motion.h2
          className="text-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] text-text-primary mb-8"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          ESTABLISH
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #00F5FF, #7B2FF7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            CONNECTION
          </span>
          <span
            className="inline-block w-3 md:w-4 h-[0.8em] bg-cyan animate-blink ml-3 align-bottom"
          />
        </motion.h2>

        <motion.p
          className="font-mono text-sm text-text-muted mb-20 max-w-xl leading-[1.9]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {'// ready to receive transmission. Whether it is a job, collaboration, or conversation, I am listening.'}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
          {/* ── Contact Form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="terminal-window">
              {/* Title bar */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border-ghost">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-hazard/60" />
                  <div className="w-3 h-3 rounded-full bg-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-green-terminal/60" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase ml-2">
                  ~/uplink.terminal
                </span>
              </div>

              {submitted ? (
                <motion.div
                  className="p-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="font-mono text-green-terminal text-xl mb-4">TRANSMISSION SENT ✓</div>
                  <p className="font-mono text-xs text-text-muted leading-relaxed">
                    Message logged. Expect a response within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form className="p-8 space-y-8" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div>
                    <label className="font-mono text-[10px] text-text-muted block mb-3 tracking-wider">
                      guest@fab-os:~$ enter_name:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-border-ghost focus:border-cyan text-text-primary font-mono text-sm py-2.5 outline-none transition-colors placeholder:text-text-muted/30"
                      placeholder="_"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-mono text-[10px] text-text-muted block mb-3 tracking-wider">
                      guest@fab-os:~$ enter_email:
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-border-ghost focus:border-cyan text-text-primary font-mono text-sm py-2.5 outline-none transition-colors placeholder:text-text-muted/30"
                      placeholder="_"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-[10px] text-text-muted block mb-3 tracking-wider">
                      guest@fab-os:~$ message:
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-transparent border border-border-ghost focus:border-cyan text-text-primary font-mono text-sm p-4 outline-none transition-colors resize-none placeholder:text-text-muted/30"
                      placeholder="Type your message..."
                    />
                  </div>

                  <MagneticButton className="w-full justify-center">
                    [ TRANSMIT_MESSAGE → ]
                  </MagneticButton>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Socials ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="font-mono text-xs text-text-muted mb-8 tracking-wider">
              $ ls ./socials --verbose
            </div>

            <div className="socials-container space-y-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link flex items-center gap-5 p-5 card-brutalist group hover:bg-graphite/60 transition-all duration-200"
                >
                  <social.icon
                    size={18}
                    className="shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: social.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] tracking-wider text-text-muted mb-1">{social.label}</div>
                    <div className="font-mono text-xs text-text-primary truncate">{social.value}</div>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-cyan transition-colors shrink-0">
                    →
                  </span>
                </a>
              ))}
            </div>

            {/* Availability status */}
            <div className="mt-10 p-6 border border-green-terminal/20 bg-green-terminal/4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-terminal animate-pulse-glow" />
                <span className="font-mono text-[10px] tracking-wider text-green-terminal">
                  STATUS: OPEN TO OPPORTUNITIES
                </span>
              </div>
              <p className="font-mono text-[11px] text-text-muted leading-relaxed">
                Actively seeking full-time roles in AI/ML Engineering,
                Full-Stack Development, or Software Engineering. Graduating 2025.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-28 pt-10 border-t border-border-ghost flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[10px] tracking-[0.12em] text-text-muted">
            © 2025 FURQAN AHMAD BASRA // BUILT WITH NEXT.JS · FRAMER MOTION · GSAP · THREE.JS
          </p>
          <p className="font-mono text-[10px] tracking-[0.12em] text-text-muted/35">
            FAB-OS v2.6 · OPERATOR.SYS
          </p>
        </div>
      </div>
    </section>
  );
}
