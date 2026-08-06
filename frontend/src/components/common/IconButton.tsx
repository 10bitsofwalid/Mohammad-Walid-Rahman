import React from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'secondary', size = 'md', label, className, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg transition-all duration-200 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-95 hover:scale-[1.05] cursor-pointer shadow-sm shadow-black/5';

    const variants = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/25 border border-transparent',
      secondary:
        'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700',
      glass:
        'bg-white/10 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 border border-white/20 dark:border-slate-700/50 backdrop-blur-md hover:bg-white/20 dark:hover:bg-slate-800/80 hover:shadow-md',
      ghost:
        'bg-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 shadow-none',
      outline:
        'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
    };

    const sizes = {
      sm: 'w-8 h-8 text-xs rounded-lg',
      md: 'w-9 h-9 text-sm rounded-lg',
      lg: 'w-10 h-10 text-base rounded-lg',
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
