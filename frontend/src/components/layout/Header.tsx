import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_ROUTES } from '../../router/routes';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUIStore } from '../../store/useUIStore';
import { Container } from './Container';
import { cn } from '../../utils/cn';

export const Header: React.FC = () => {
  const { isScrolled } = useScrollPosition(20);
  const { activeSection } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/90 dark:bg-[var(--color-surface-glass)] backdrop-blur-md border-[var(--color-border-subtle)] py-3 shadow-xs'
          : 'bg-transparent border-transparent py-4 sm:py-5'
      )}
    >
      <Container size="full" className="flex items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <div className="flex-1 flex items-center justify-start">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
            aria-label="Mohammad Walid Rahman Home Page"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform duration-200">
              WR
            </div>
            <span className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-white tracking-tight whitespace-nowrap">
              Walid Rahman
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 px-4" aria-label="Main Navigation">
          {NAV_ROUTES.map((route) => {
            const isActive = activeSection === route.id;
            return (
              <a
                key={route.id}
                href={route.path}
                onClick={(e) => handleNavClick(e, route.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'text-xs xl:text-sm font-medium transition-colors duration-150 whitespace-nowrap',
                  isActive
                    ? 'text-[#4F46E5] dark:text-indigo-400 font-semibold'
                    : 'text-[#475569] dark:text-gray-300 hover:text-[#0F172A] dark:hover:text-white'
                )}
              >
                {route.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex-1 flex items-center justify-end">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden lg:inline-flex dark-pill-btn text-xs xl:text-sm px-4 xl:px-5 py-2 xl:py-2.5 hover:no-underline shrink-0"
            aria-label="Contact Mohammad Walid Rahman"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[var(--color-border-subtle)] bg-white dark:bg-gray-800 text-[#0F172A] dark:text-white"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="lg:hidden bg-white dark:bg-[var(--color-surface-base)] border-b border-[var(--color-border-subtle)] px-6 py-4 space-y-3 shadow-lg"
          aria-label="Mobile Navigation"
        >
          {NAV_ROUTES.map((route) => (
            <a
              key={route.id}
              href={route.path}
              onClick={(e) => handleNavClick(e, route.id)}
              className="block text-sm font-medium text-[#475569] dark:text-gray-200 hover:text-[#4F46E5] py-1"
            >
              {route.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="dark-pill-btn text-xs w-full py-2.5 justify-center"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
