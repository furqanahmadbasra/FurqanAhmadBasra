'use client';

import { create } from 'zustand';

type CursorMode = 'default' | 'link' | 'project' | 'hidden';

interface UIState {
  cursorMode: CursorMode;
  cursorLabel: string;
  bootSeen: boolean;
  stealthMode: boolean;
  setCursorMode: (mode: CursorMode, label?: string) => void;
  setBootSeen: () => void;
  toggleStealthMode: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  cursorMode: 'default',
  cursorLabel: '',
  bootSeen: typeof window !== 'undefined' ? sessionStorage.getItem('boot-seen') === 'true' : false,
  stealthMode: false,
  setCursorMode: (mode, label = '') => set({ cursorMode: mode, cursorLabel: label }),
  setBootSeen: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('boot-seen', 'true');
    }
    set({ bootSeen: true });
  },
  toggleStealthMode: () => set((state) => {
    const next = !state.stealthMode;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('stealth-mode', next);
    }
    return { stealthMode: next };
  }),
}));
