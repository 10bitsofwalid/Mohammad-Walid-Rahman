import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wide"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          className={cn(
            'w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 resize-y',
            'bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-disabled)]',
            'focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-glow)]',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />

        {error ? (
          <span
            id={`${textareaId}-error`}
            role="alert"
            className="text-xs font-medium text-rose-500"
          >
            {error}
          </span>
        ) : helperText ? (
          <span id={`${textareaId}-helper`} className="text-xs text-[var(--color-text-muted)]">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
