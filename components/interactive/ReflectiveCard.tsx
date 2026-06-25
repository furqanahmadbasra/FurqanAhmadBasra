'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function ReflectiveCard({ 
  children, 
  className = '', 
  ...props
}: { 
  children: React.ReactNode, 
  className?: string,
  [key: string]: any
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
        animate={{ opacity: isHovering ? 1 : 0 }}
      />
      <div className="relative z-10 h-full w-full flex flex-col">{children}</div>
    </article>
  );
}
