import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.getItem(key, initialValue);
  });

  useEffect(() => {
    storage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
