export const animations = {
  easings: {
    spring: 'var(--ease-spring)',
    smooth: 'var(--ease-smooth)',
  },
  durations: {
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
  },
  blurs: {
    sm: 'var(--blur-sm)',
    md: 'var(--blur-md)',
    lg: 'var(--blur-lg)',
  },
} as const;

export type Animations = typeof animations;
