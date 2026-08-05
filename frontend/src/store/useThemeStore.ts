import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode } from '../types';

export type ResolvedTheme = 'dark' | 'light';

interface ThemeState {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setResolvedTheme: (resolvedTheme: ResolvedTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      resolvedTheme: 'dark',

      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const current = get().theme;
        const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
        set({ theme: next, resolvedTheme: next as ResolvedTheme });
      },

      setResolvedTheme: (resolvedTheme) => {
        set({ resolvedTheme });
      },
    }),
    {
      name: 'portfolio-theme-preference',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
