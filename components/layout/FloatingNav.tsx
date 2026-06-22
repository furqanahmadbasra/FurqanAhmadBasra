'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';

const navItems = [
  { label: '01_INIT', href: '#hero' },
  { label: '02_SYSTEMS', href: '#skills' },
  { label: '03_DEPLOYMENTS', href: '#projects' },
  { label: '04_CHANGELOG', href: '#timeline' },
  { label: '05_UPLINK', href: '#contact' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const stealthMode = useUIStore((s) => s.stealthMode);
  const toggleStealthMode = useUIStore((s) => s.toggleStealthMode);

  const navOpacity = useTransform(scrollY, [0, 100], [0.85, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className={`fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-8 md:px-12 transition-all duration-300 ${
        isScrolled ? 'glass-panel' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className="font-mono text-sm tracking-[0.2em] text-cyan">
        F.A.B<span className="text-text-muted">/01</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          const sectionId = item.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.href)}
              className={`relative px-4 py-2.5 font-mono text-xs tracking-wider transition-colors duration-200 ${
                isActive ? 'text-cyan' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              [{item.label}]
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan"
                  style={{ boxShadow: '0 0 8px rgba(0, 245, 255, 0.6)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Stealth Mode Toggle */}
        <button
          onClick={toggleStealthMode}
          className="font-mono text-xs text-text-muted hover:text-cyan transition-colors p-1"
          title={stealthMode ? 'Disable Stealth Mode' : 'Enable Stealth Mode'}
        >
          {stealthMode ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>

        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-2.5 font-mono text-xs text-text-muted">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-terminal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-terminal" />
          </span>
          <span className="tracking-wider">AVAILABLE</span>
        </div>
      </div>
    </motion.nav>
  );
}
