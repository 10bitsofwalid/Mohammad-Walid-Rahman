import { clsx, type ClassValue } from 'clsx';

/**
 * Combines multiple class names or conditional class objects into a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
