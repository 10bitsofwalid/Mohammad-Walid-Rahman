export const typography = {
  fonts: {
    sans: 'var(--font-family-sans)',
    mono: 'var(--font-family-mono)',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    display: 'var(--font-size-display)',
    h1: 'var(--font-size-h1)',
    h2: 'var(--font-size-h2)',
    h3: 'var(--font-size-h3)',
    h4: 'var(--font-size-h4)',
    bodyLg: 'var(--font-size-body-lg)',
    body: 'var(--font-size-body)',
    bodySm: 'var(--font-size-body-sm)',
    caption: 'var(--font-size-caption)',
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
  },
} as const;

export type Typography = typeof typography;
