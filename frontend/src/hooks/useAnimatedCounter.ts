import { useState, useEffect } from 'react';

/**
 * Animated numerical counter hook that counts up from 0 to target number when triggered.
 */
export function useAnimatedCounter(
  target: number,
  duration: number = 2000,
  startTrigger: boolean = true
): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!startTrigger) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease-out quad formula for natural deceleration
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration, startTrigger]);

  return count;
}
