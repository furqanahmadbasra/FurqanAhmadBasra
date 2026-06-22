'use client';

import GlitchText from '@/components/interactive/GlitchText';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
}

export default function SectionHeader({ index, label, title }: SectionHeaderProps) {
  return (
    <div className="mb-20 md:mb-28">
      {/* Overline label */}
      <div className="text-label mb-5 flex items-center gap-4">
        <span className="text-cyan/40">[ {index}</span>
        <span className="flex-1 h-[1px] bg-border-ghost max-w-[60px]" />
        <span>{label} ]</span>
      </div>
      {/* Main title */}
      <GlitchText className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] text-text-primary leading-[0.9]">
        {title}
      </GlitchText>
    </div>
  );
}
