import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { GlassCard, Button, Input } from '../common';
import { ShieldCheck, Lock, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const modalRef = useFocusTrap<HTMLDivElement>({
    active: isOpen,
    onEscape: onClose,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(password);
    if (success) {
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Invalid admin password. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      aria-describedby="admin-modal-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <GlassCard
        ref={modalRef}
        tabIndex={-1}
        padding="lg"
        className="relative max-w-md w-full z-10 space-y-6 animate-fade-in-up border-[var(--color-accent-primary)]/40 shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-accent-glow)] border border-[var(--color-accent-primary)]/20 flex items-center justify-center text-[var(--color-accent-primary)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="admin-modal-title"
                className="text-lg font-bold text-[var(--color-text-primary)]"
              >
                Admin CMS Access
              </h3>
              <p id="admin-modal-desc" className="text-xs text-[var(--color-text-muted)]">
                Authenticate to manage portfolio data
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Close admin access modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Admin Master Password"
            type="password"
            placeholder="Enter password (e.g. admin123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            autoFocus
          />

          <Button type="submit" fullWidth size="lg">
            Unlock Admin CMS
          </Button>
        </form>

        <div className="text-center text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)]">
          Demo Master Passwords:{' '}
          <code className="text-[var(--color-accent-primary)] font-mono">admin123</code> or{' '}
          <code className="text-[var(--color-accent-primary)] font-mono">walid2024</code>
        </div>
      </GlassCard>
    </div>
  );
};
