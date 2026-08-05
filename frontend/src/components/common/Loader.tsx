import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className, label }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <Loader2
        className={cn('animate-spin text-[var(--color-accent-primary)]', sizes[size], className)}
      />
      {label && (
        <span className="text-xs font-medium text-[var(--color-text-muted)] animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};
