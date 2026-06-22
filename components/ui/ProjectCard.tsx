'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { type Project, categoryColors } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [7, -7]);
  const rotateY = useTransform(x, [0, 1], [-7, 7]);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  };

  const categoryColor = categoryColors[project.category];

  return (
    <motion.div
      ref={ref}
      className="card-brutalist group relative overflow-hidden h-full flex flex-col"
      style={{
        perspective: 1200,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        minHeight: featured ? '420px' : '320px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      whileHover={{
        borderColor: '#FF2E9A',
        boxShadow: '0 0 30px rgba(255, 46, 154, 0.1), 0 0 1px rgba(255, 46, 154, 0.5)',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Category color top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{ backgroundColor: categoryColor, opacity: isHovered ? 1 : 0.35 }}
      />

      {/* Header bar */}
      <div
        className="px-6 py-4 border-b border-border-ghost flex items-center justify-between shrink-0"
        style={{ backgroundColor: `${categoryColor}07` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: categoryColor, boxShadow: `0 0 6px ${categoryColor}` }}
          />
          <span
            className="font-mono text-xs tracking-[0.1em] font-semibold"
            style={{ color: categoryColor }}
          >
            {project.title.toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-[10px] text-text-muted tracking-wider shrink-0 ml-3">
          {project.semester}
        </span>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1 gap-5">
        {/* Description */}
        <div>
          <p className="text-text-muted text-xs font-mono tracking-wider mb-3 leading-relaxed">
            {project.tagline}
          </p>
          <p className="text-text-primary/80 text-sm leading-[1.85]">
            {project.description}
          </p>
        </div>

        {/* Highlights (featured only) */}
        {featured && (
          <div className="space-y-2.5">
            {project.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-xs text-text-muted">
                <span className="text-cyan mt-0.5 shrink-0">{'>'}</span>
                <span className="leading-[1.7]">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] tracking-wider px-2.5 py-1 border transition-colors duration-200"
              style={{
                borderColor: `${categoryColor}30`,
                color: `${categoryColor}CC`,
                backgroundColor: `${categoryColor}06`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-5 font-mono text-xs mt-auto pt-4 border-t border-border-ghost">
          <Link href={`/work/${project.slug}`} className="text-cyan hover:text-magenta transition-colors">
            Details
          </Link>
          {project.github && (
            <a
              href={project.github}
              className="text-text-muted hover:text-cyan transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              [ SOURCE ]
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              className="text-text-muted hover:text-green-terminal transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              [ LIVE ]
            </a>
          )}
        </div>
      </div>

      {/* CRT scanline hover overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.012) 3px, rgba(0,245,255,0.012) 6px)`,
        }}
      />
    </motion.div>
  );
}
