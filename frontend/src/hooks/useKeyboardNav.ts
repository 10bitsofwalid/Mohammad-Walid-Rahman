import { useEffect } from 'react';

interface KeyboardNavOptions {
  onEscape?: () => void;
  onSearchHotkey?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  onEscape,
  onSearchHotkey,
  enabled = true,
}: KeyboardNavOptions): void {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape Key
      if (event.key === 'Escape' && onEscape) {
        onEscape();
      }

      // Cmd+K or Ctrl+K for Search
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (onSearchHotkey) {
          event.preventDefault();
          onSearchHotkey();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onSearchHotkey, enabled]);
}
