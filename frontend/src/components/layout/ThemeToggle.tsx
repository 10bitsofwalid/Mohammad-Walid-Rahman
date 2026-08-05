import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { ThemeMode } from '../../types';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, showLabels = false }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (showLabels) {
    const modes: { key: ThemeMode; label: string; icon: React.ReactNode }[] = [
      { key: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
      { key: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
      { key: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
    ];

    return (
      <div
        role="group"
        aria-label="Theme options"
        className={cn(
          'inline-flex items-center p-1 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]',
          className
        )}
      >
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setTheme(m.key)}
            aria-pressed={theme === m.key}
            aria-label={`Switch to ${m.label} theme`}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]',
              theme === m.key
                ? 'bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
            title={`Switch to ${m.label} theme`}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]',
        className
      )}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Current: ${resolvedTheme} mode. Click to toggle.`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
