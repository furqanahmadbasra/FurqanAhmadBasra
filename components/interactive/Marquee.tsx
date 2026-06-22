'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  reverse = false,
  speed = 30,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden border-y border-border-ghost ${className}`}
      style={{ ['--marquee-speed' as string]: `${speed}s` }}
    >
      <div
        className={`flex whitespace-nowrap ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        } ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
