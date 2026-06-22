'use client';

import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useUIStore } from '@/lib/store/useUIStore';

export default function ParticleNetwork() {
  const stealthMode = useUIStore((s) => s.stealthMode);

  if (stealthMode) return null;

  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'grab',
              },
            },
            modes: {
              grab: {
                distance: 150,
                links: { opacity: 0.4, color: '#00F5FF' },
              },
            },
          },
          particles: {
            color: { value: '#7C8694' },
            links: {
              color: '#7C8694',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'bounce' },
            },
            number: {
              density: { enable: true, width: 800 },
              value: 60,
            },
            opacity: { value: 0.3 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
