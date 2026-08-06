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
          'inline-flex items-center p-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md w-full justify-between',
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
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
              theme === m.key
                ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
        'relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 border border-slate-200/80 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-xl text-slate-700 dark:text-amber-300 hover:bg-white dark:hover:bg-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:scale-105 active:scale-95',
        className
      )}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
