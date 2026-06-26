'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
};

const defaultItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Project Filter', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface SiteNavProps {
  items?: NavItem[];
}

export function SiteNav({ items = defaultItems }: SiteNavProps) {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Transform background blur and shadow based on scroll
  // Dark surface color for brutalist dark mode ensures text remains visible
  const backgroundY = useTransform(scrollY, [0, 50], ['rgba(17, 17, 17, 0)', 'rgba(17, 17, 17, 0.85)']);
  const shadowY = useTransform(scrollY, [0, 50], ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 20px rgba(0, 0, 0, 0.5)']);
  const backdropBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(16px)']);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[18px] left-0 right-0 z-[60] flex justify-center px-4"
      >
        <motion.div 
          style={{
            background: backgroundY,
            boxShadow: shadowY,
            backdropFilter: backdropBlur,
            WebkitBackdropFilter: backdropBlur,
          }}
          className="flex items-center justify-between gap-8 px-4 py-3 border border-[var(--line)] rounded-full max-w-[800px] w-full"
        >
          <Link 
            href="/" 
            className="flex items-center justify-center w-10 h-10 bg-black text-white font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-md" 
            aria-label="Furqan Ahmad Basra home"
            style={{ color: 'white' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAB
          </Link>
          
          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 text-[var(--muted)] font-medium text-sm">
            {items.map((item) => (
              <Link 
                key={`${item.href}-${item.label}`} 
                href={item.href}
                className="relative py-1 hover:text-[var(--ink)] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--accent-strong)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center text-[var(--ink)] p-2 hover:bg-[var(--surface-soft)] rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[55] bg-[var(--bg)] flex flex-col justify-center items-center px-4"
          >
            <nav className="flex flex-col items-center gap-8 text-[var(--ink)] font-bold text-3xl">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.href}-${item.label}-mobile`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[var(--muted)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
