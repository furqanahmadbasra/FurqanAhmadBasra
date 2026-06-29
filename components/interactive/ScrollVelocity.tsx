'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';

interface ScrollVelocityProps {
  text: string;
  baseVelocity?: number;
  className?: string;
}

export function ScrollVelocity({
  text,
  baseVelocity = 5,
  className = '',
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * velocityFactor.get() * moveBy;

    baseX.set(baseX.get() + moveBy);
  });

  // Keep it repeating infinitely
  const x = useTransform(baseX, (v) => {
    // Wrapping the position so that the text moves continuously
    const wrap = (min: number, max: number, value: number) => {
      const rangeSize = max - min;
      return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };
    return `${wrap(-20, -45, v)}%`;
  });

  return (
    <div className={`overflow-hidden tracking-[-2px] leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap ${className}`}>
      <motion.div className="flex whitespace-nowrap uppercase font-bold text-[clamp(1.8rem,6vw,6rem)] will-change-transform" style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="block mr-12 opacity-[0.03] select-none text-white">
            {text}{' '}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
