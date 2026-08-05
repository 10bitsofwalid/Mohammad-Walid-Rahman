import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'bordered' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, variant = 'default', padding = 'md', interactive = false, ...props },
    ref
  ) => {
    const baseStyles =
      'rounded-2xl transition-all duration-300 bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)]';

    const variants = {
      default: 'shadow-sm',
      hover:
        'hover:border-[var(--color-border-strong)] hover:shadow-md hover:shadow-[var(--color-accent-glow)]',
      bordered: 'border-[var(--color-border-strong)] bg-transparent',
      gradient: 'bg-[var(--gradient-surface)] border-[var(--color-border-subtle)] shadow-md',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          interactive && 'hover:-translate-y-1 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
