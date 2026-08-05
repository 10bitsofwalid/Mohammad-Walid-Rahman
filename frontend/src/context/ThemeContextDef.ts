import { createContext } from 'react';
import { ThemeMode } from '../types';
import { ResolvedTheme } from '../store/useThemeStore';

export interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
