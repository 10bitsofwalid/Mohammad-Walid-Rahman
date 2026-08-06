import React from 'react';
import { PlusIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  specular?: boolean;
  interactive?: boolean;
  showCorners?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, padding = 'md', specular = true, interactive = true, showCorners = false, ...props }, ref) => {
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
          'relative glass-card rounded-2xl',
          paddings[padding],
          specular && 'specular-border',
          interactive &&
            'hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent-glow)] cursor-pointer',
          className
        )}
        {...props}
      >
        {showCorners && (
          <>
            <PlusIcon className="absolute -top-3 -left-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
            <PlusIcon className="absolute -top-3 -right-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
            <PlusIcon className="absolute -bottom-3 -left-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
            <PlusIcon className="absolute -right-3 -bottom-3 h-5 w-5 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
          </>
        )}
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
