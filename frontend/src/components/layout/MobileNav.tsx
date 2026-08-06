import React from 'react';
import { X } from 'lucide-react';
import { NAV_ROUTES } from '../../router/routes';
import { useUIStore } from '../../store/useUIStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../utils/cn';

export const MobileNav: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu, activeSection, setActiveSection } = useUIStore();

  const containerRef = useFocusTrap<HTMLDivElement>({
    active: isMobileMenuOpen,
    onEscape: closeMobileMenu,
  });

  if (!isMobileMenuOpen) return null;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    closeMobileMenu();

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--color-bg-primary)] border-l border-[var(--color-border-subtle)] p-6 shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 animate-slide-in outline-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border-subtle)]">
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              Navigation
            </span>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {NAV_ROUTES.map((route) => {
              const isActive = activeSection === route.id;
              return (
                <a
                  key={route.id}
                  href={route.path}
                  onClick={(e) => handleNavClick(e, route.id)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]',
                    isActive
                      ? 'bg-[var(--color-surface-hover)] text-[var(--color-accent-primary)] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-base)]'
                  )}
                >
                  <span>{route.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Appearance Options */}
        <div className="pt-6 border-t border-[var(--color-border-subtle)] flex flex-col gap-3">
          <span className="text-xs text-[var(--color-text-muted)] font-medium">Appearance</span>
          <ThemeToggle showLabels />
        </div>
      </div>
    </div>
  );
};
