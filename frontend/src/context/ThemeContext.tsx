import React, { useEffect } from 'react';
import { useThemeStore, ResolvedTheme } from '../store/useThemeStore';
import { ThemeContext } from './ThemeContextDef';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme, setResolvedTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    const updateResolvedTheme = () => {
      let activeTheme: ResolvedTheme = 'dark';

      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = systemPrefersDark ? 'dark' : 'light';
      } else {
        activeTheme = theme as ResolvedTheme;
      }

      setResolvedTheme(activeTheme);
      root.setAttribute('data-theme', activeTheme);
      if (activeTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    updateResolvedTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    return undefined;
  }, [theme, setResolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
