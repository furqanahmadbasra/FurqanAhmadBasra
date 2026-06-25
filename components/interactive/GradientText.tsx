'use client';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  className?: string;
}

export function GradientText({
  children,
  colors = ['#2563eb', '#10b981', '#3b82f6', '#2563eb'],
  animationSpeed = 6,
  className = '',
}: GradientTextProps) {
  const gradient = colors.join(', ');

  return (
    <span
      className={`inline-block text-transparent bg-clip-text font-bold select-none animate-gradient-flow ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradient})`,
        animationDuration: `${animationSpeed}s`,
      }}
    >
      {children}
    </span>
  );
}
