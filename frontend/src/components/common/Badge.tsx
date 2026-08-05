import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'glass';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors';

  const variants = {
    default:
      'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]',
    neutral:
      'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]',
    accent:
      'bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]/30',
    success: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-950/40 text-amber-400 border-amber-500/30',
    error: 'bg-rose-950/40 text-rose-400 border-rose-500/30',
    info: 'bg-sky-950/40 text-sky-400 border-sky-500/30',
    glass: 'glass-pill text-[var(--color-text-primary)] border-[var(--color-border-subtle)]',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-xs',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
