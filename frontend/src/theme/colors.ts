export const colors = {
  bg: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    tertiary: 'var(--color-bg-tertiary)',
  },
  surface: {
    base: 'var(--color-surface-base)',
    hover: 'var(--color-surface-hover)',
    active: 'var(--color-surface-active)',
    glass: 'var(--color-surface-glass)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    disabled: 'var(--color-text-disabled)',
  },
  accent: {
    primary: 'var(--color-accent-primary)',
    hover: 'var(--color-accent-hover)',
    glow: 'var(--color-accent-glow)',
  },
  border: {
    subtle: 'var(--color-border-subtle)',
    strong: 'var(--color-border-strong)',
    focus: 'var(--color-border-focus)',
  },
  status: {
    success: 'var(--color-status-success)',
    warning: 'var(--color-status-warning)',
    error: 'var(--color-status-error)',
    info: 'var(--color-status-info)',
  },
  gradients: {
    accent: 'var(--gradient-accent)',
    surface: 'var(--gradient-surface)',
    glass: 'var(--gradient-glass)',
  },
} as const;

export type Colors = typeof colors;
