import React from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_ROUTES } from '../../router/routes';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUIStore } from '../../store/useUIStore';
import { Container } from './Container';
import { cn } from '../../utils/cn';

export const Header: React.FC = () => {
  const { isScrolled } = useScrollPosition(20);
  const { activeSection, setActiveSection, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/85 dark:bg-[#0B1120]/85 backdrop-blur-xl border-slate-200/80 dark:border-slate-800/80 py-2.5 shadow-sm'
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

        {/* Desktop Navigation Glass Bar */}
        <nav
          className="hidden lg:flex items-center justify-center gap-1 xl:gap-1.5 p-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xl shadow-xs transition-all duration-300"
          aria-label="Main Navigation"
        >
          {NAV_ROUTES.map((route) => {
            const isActive = activeSection === route.id;
            return (
              <a
                key={route.id}
                href={route.path}
                onClick={(e) => handleNavClick(e, route.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap outline-none flex items-center justify-center',
                  isActive
                    ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white font-semibold shadow-xs border border-indigo-100/80 dark:border-indigo-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                )}
              >
                <span>{route.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-300 shadow-xs" />
                )}
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
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-[var(--color-border-subtle)] bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>
    </header>
  );
};

