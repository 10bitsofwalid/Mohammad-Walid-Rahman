import { useMediaQuery } from './useMediaQuery';

/**
 * Custom hook to detect if user has requested reduced motion via operating system settings.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
