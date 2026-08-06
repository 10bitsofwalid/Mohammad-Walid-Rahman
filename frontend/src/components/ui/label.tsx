import React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-xs font-semibold text-[#0F172A] dark:text-gray-200 tracking-wide uppercase',
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';
