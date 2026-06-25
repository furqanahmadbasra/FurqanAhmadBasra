'use client';

import { useEffect, useRef } from 'react';

export function Silk() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let animationId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      const waveCount = 5;
      const step = canvas.width / 120;

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        // Dynamic opacity and gradient properties
        const alpha = 0.02 + 0.03 * (w / waveCount);
        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.lineWidth = 1.5 + w * 0.5;

        for (let x = 0; x <= canvas.width; x += step) {
          const normX = x / canvas.width;
          // Compound waves for organic silk flow look
          const y1 = Math.sin(normX * 2.5 + time + w * 0.8) * 60;
          const y2 = Math.cos(normX * 5.0 - time * 1.5 + w * 0.4) * 30;
          const y3 = Math.sin(normX * 8.0 + time * 0.5 + w * 1.2) * 15;
          
          const y = canvas.height * 0.5 + y1 + y2 + y3;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
