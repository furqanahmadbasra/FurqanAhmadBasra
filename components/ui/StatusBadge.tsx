'use client';

interface StatusBadgeProps {
  status: 'online' | 'completed' | 'in-progress' | 'error';
  label: string;
}

const statusConfig = {
  online: { color: '#39FF14', bgColor: 'rgba(57, 255, 20, 0.1)', label: 'ONLINE' },
  completed: { color: '#39FF14', bgColor: 'rgba(57, 255, 20, 0.1)', label: 'COMPLETED' },
  'in-progress': { color: '#FFB200', bgColor: 'rgba(255, 178, 0, 0.1)', label: 'IN_PROGRESS' },
  error: { color: '#FF3B3B', bgColor: 'rgba(255, 59, 59, 0.1)', label: 'ERROR' },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] uppercase"
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
        border: `1px solid ${config.color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 flex-shrink-0"
        style={{
          backgroundColor: config.color,
          boxShadow: `0 0 6px ${config.color}`,
          animation: status === 'in-progress' ? 'blink 1.5s ease-in-out infinite' : 'none',
        }}
      />
      {label || config.label}
    </div>
  );
}
