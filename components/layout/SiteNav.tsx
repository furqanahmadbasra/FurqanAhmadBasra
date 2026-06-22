'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  
  // Transform background blur and shadow based on scroll
  const backgroundY = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.6)']);
  const shadowY = useTransform(scrollY, [0, 50], ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 20px rgba(0, 0, 0, 0.05)']);
  const backdropBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(16px)']);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <motion.div 
        style={{
          background: backgroundY,
          boxShadow: shadowY,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        className="flex items-center justify-between gap-8 px-4 py-3 border border-slate-200/50 rounded-full max-w-[800px] w-full"
      >
        <Link 
          href="/" 
          className="flex items-center justify-center w-10 h-10 bg-slate-900 text-white font-bold rounded-full text-sm hover:scale-105 transition-transform" 
          aria-label="Furqan Ahmad Basra home"
        >
          FAB
        </Link>
        
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 text-slate-600 font-medium text-sm">
          {items.map((item) => (
            <Link 
              key={`${item.href}-${item.label}`} 
              href={item.href}
              className="relative py-1 hover:text-blue-600 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
