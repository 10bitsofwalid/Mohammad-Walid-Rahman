import React from 'react';
import { cn } from '../../utils/cn';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <IconComponent
      className={cn('shrink-0 text-current transition-colors', sizes[size], className)}
      {...props}
    />
  );
};
