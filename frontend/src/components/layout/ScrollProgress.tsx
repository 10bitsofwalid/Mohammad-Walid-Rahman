import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[var(--gradient-accent)] transition-all duration-150 ease-out shadow-[0_0_8px_var(--color-accent-glow)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
