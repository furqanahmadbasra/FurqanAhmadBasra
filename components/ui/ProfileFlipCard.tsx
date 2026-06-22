'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProfileFlipCardProps {
  imageSrc?: string;
  imageAlt?: string;
  backContent: React.ReactNode;
}

export function ProfileFlipCard({ 
  imageSrc = '/profile-placeholder.jpg', // Replace this with actual image path
  imageAlt = 'Profile picture',
  backContent 
}: ProfileFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-full min-h-[320px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      aria-label="Profile Card - Hover to flip"
    >
      <div 
        className="w-full h-full transition-transform duration-700 relative"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        {/* Front Face (Picture) */}
        <div 
          className="absolute w-full h-full rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm bg-slate-100 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* We use a standard img tag here to avoid Next.js Image component errors if the file doesn't exist yet */}
          {/* Change to next/image when you add your actual picture to the public folder */}
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image not found
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-50', 'to-slate-100');
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
              Hover to reveal
            </span>
          </div>
        </div>
        
        {/* Back Face (Details) */}
        <div 
          className="absolute w-full h-full rounded-2xl border border-slate-200/60 bg-[rgba(251,252,254,0.9)] backdrop-blur-xl overflow-hidden shadow-lg p-6 flex flex-col justify-center"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
