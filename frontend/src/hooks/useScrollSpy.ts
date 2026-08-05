import { useState, useEffect } from 'react';

/**
 * High-performance Section Observer hook using IntersectionObserver.
 */
export function useScrollSpy(sectionIds: string[], offset: number = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

    if (hasIntersectionObserver) {
      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      };

      const handleIntersection: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, observerOptions);

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    } else {
      // Fallback for older environments
      const handleScroll = () => {
        const scrollPosition = window.scrollY + offset;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const section = document.getElementById(sectionIds[i]);
          if (section) {
            const top = section.offsetTop;
            if (scrollPosition >= top) {
              setActiveId(sectionIds[i]);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sectionIds, offset]);

  return activeId;
}
