import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

function applyTheme(t: Theme) {
  document.documentElement.classList.toggle('light', t === 'light');
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'dark',
  toggle: () =>
    set((s) => {
      const next = s.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
      return { theme: next };
    }),
  set: (t) => {
    localStorage.setItem('theme', t);
    applyTheme(t);
    set({ theme: t });
  },
}));

// Init on load
applyTheme((localStorage.getItem('theme') as Theme) || 'dark');
