export const shadows = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  inner: 'var(--shadow-inner)',
  glass: 'var(--shadow-glass)',
  glow: 'var(--shadow-glow)',
} as const;

export type Shadows = typeof shadows;
