import React from 'react';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  gradientTitle?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  gradientTitle = true,
  className,
}) => {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col mb-12 sm:mb-16', alignments[align], className)}>
      {badge && (
        <Badge variant="accent" className="mb-3">
          {badge}
        </Badge>
      )}

      <h2
        className={cn(
          'text-h2 font-bold tracking-tight text-[var(--color-text-primary)] max-w-2xl',
          gradientTitle && 'gradient-text-accent'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-body-lg text-[var(--color-text-secondary)] max-w-xl">{subtitle}</p>
      )}
    </div>
  );
};
