'use client';

import { useEffect, useState, useRef } from 'react';

interface ScrambledTextProps {
  text: string;
  speed?: number;
  delay?: number;
  scrambleCount?: number;
  triggerOnHover?: boolean;
  className?: string;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-/[]{}<>';

export function ScrambledText({
  text,
  speed = 40,
  delay = 0,
  scrambleCount = 3,
  triggerOnHover = false,
  className = '',
}: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsAnimating(false);
      }

      iteration += 1 / scrambleCount;
    }, speed);
  };

  useEffect(() => {
    if (!triggerOnHover) {
      const startDelay = setTimeout(startAnimation, delay);
      return () => clearTimeout(startDelay);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, delay, triggerOnHover]);

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={triggerOnHover ? startAnimation : undefined}
    >
      {displayText}
    </span>
  );
}
