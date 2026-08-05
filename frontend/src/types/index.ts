export type ThemeMode = 'dark' | 'light' | 'system';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export * from './api';
