import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
  isScrolled: boolean;
  isHeaderVisible: boolean;
}

export function useScrollPosition(threshold: number = 20): ScrollPosition {
  const [scrollState, setScrollState] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'none',
    isScrolled: false,
    isHeaderVisible: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;
      const diffY = currentY - lastY;

      let direction: 'up' | 'down' | 'none' = 'none';
      if (diffY > 3) direction = 'down';
      else if (diffY < -3) direction = 'up';

      // Header visibility logic: visible if at top (< 100px) OR scrolling UP
      const isHeaderVisible = currentY < 100 || direction === 'up' || direction === 'none';

      setScrollState({
        x: currentX,
        y: currentY,
        direction,
        isScrolled: currentY > threshold,
        isHeaderVisible,
      });

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
}
