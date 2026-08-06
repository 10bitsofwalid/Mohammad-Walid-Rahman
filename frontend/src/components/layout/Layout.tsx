import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { ScrollProgress } from './ScrollProgress';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { SECTION_IDS } from '../../router/routes';
import { useUIStore } from '../../store/useUIStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { AnimatedGradient } from '../ui/animated-gradient';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const activeSpyId = useScrollSpy(SECTION_IDS, 120);
  const { setActiveSection, toasts, removeToast } = useUIStore();

  useEffect(() => {
    if (activeSpyId) {
      setActiveSection(activeSpyId);
    }
  }, [activeSpyId, setActiveSection]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300 font-sans">
      {/* Ambient Animated WebGL Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20 dark:opacity-45">
        <AnimatedGradient
          config={{ preset: "Oceanic", speed: 12 }}
          noise={{ opacity: 0.03 }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* WCAG Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--color-accent-primary)] focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          Skip to main content
        </a>

        {/* Viewport Reading Scroll Progress Bar */}
        <ScrollProgress />

        {/* Header Bar */}
        <Header />

        {/* Mobile Navigation Drawer */}
        <MobileNav />

        {/* Toast Notification Container */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="alert"
              className={cn(
                'pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md text-sm transition-all duration-300 animate-slide-in',
                toast.type === 'success' &&
                  'bg-emerald-950/80 border-emerald-500/30 text-emerald-200',
                toast.type === 'error' && 'bg-rose-950/80 border-rose-500/30 text-rose-200',
                toast.type === 'info' && 'bg-sky-950/80 border-sky-500/30 text-sky-200',
                toast.type === 'warning' && 'bg-amber-950/80 border-amber-500/30 text-amber-200'
              )}
            >
              <div className="flex items-center gap-3">
                {toast.type === 'success' && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
                {toast.type === 'warning' && (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity ml-2"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Main Page Layout Content Shell */}
        <main id="main-content" tabIndex={-1} className="flex-1 w-full pt-20 focus:outline-none">
          {children}
        </main>

        {/* Footer Bar */}
        <Footer />
      </div>
    </div>
  );
};
