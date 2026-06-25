'use client';

import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: string;
  borderRadius?: string;
  className?: string;
}

export function ElectricBorder({
  children,
  colors = ['#3b82f6', '#10b981', '#6366f1', '#3b82f6'],
  animationSpeed = '4s',
  borderRadius = '8px',
  className = '',
}: ElectricBorderProps) {
  const gradient = colors.join(', ');

  return (
    <div
      className={`relative p-[1.5px] overflow-hidden ${className}`}
      style={{
        borderRadius,
      }}
    >
      {/* Flowing border background */}
      <div
        className="absolute inset-[-100%] pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${gradient})`,
          animation: `electric-spin ${animationSpeed} linear infinite`,
        }}
      />
      {/* Content wrapper */}
      <div
        className="relative z-10 w-full h-full bg-[#f6f7f9] text-[#17202a]"
        style={{
          borderRadius: `calc(${borderRadius} - 1.5px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
