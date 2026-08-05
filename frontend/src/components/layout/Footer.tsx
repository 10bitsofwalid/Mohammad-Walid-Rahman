import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';
import { NAV_ROUTES } from '../../router/routes';
import { Github, Linkedin, Mail, Twitter, ArrowUp, Heart, Coffee, Facebook, Instagram } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const { authorName, socials } = PORTFOLIO_DATA;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
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
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] dark:bg-[var(--color-surface-base)] pt-10 pb-8 transition-colors duration-300">
      <Container className="space-y-6">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-border-subtle)]">
          {/* Brand Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] flex items-center justify-center font-bold text-xs shadow-xs hover:scale-105 transition-transform">
                WR
              </div>
              <span className="font-semibold text-sm text-[var(--color-text-primary)] tracking-tight">
                {authorName}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              Building digital experiences and solving problems with code.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-[var(--color-text-secondary)]"
            aria-label="Footer Navigation"
          >
            {NAV_ROUTES.map((route) => (
              <a
                key={route.id}
                href={route.path}
                onClick={(e) => handleNavClick(e, route.id)}
                className="hover:text-[var(--color-accent-primary)] transition-colors duration-200"
              >
                {route.label}
              </a>
            ))}
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] hover:scale-110 transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={socials.email}
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] hover:scale-110 transition-all duration-200"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] hover:scale-110 transition-all duration-200"
              aria-label="X / Twitter Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] hover:scale-110 transition-all duration-200"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] hover:scale-110 transition-all duration-200"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm group ml-1"
              aria-label="Back to Top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-2">
          <div>© {currentYear} {authorName}. All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Made with lots of coffee</span>
            <Coffee className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
          </div>
        </div>
      </Container>
    </footer>
  );
};
