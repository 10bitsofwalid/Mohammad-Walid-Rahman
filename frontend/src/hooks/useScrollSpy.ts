import { useState, useEffect } from 'react';

/**
 * High-performance, accurate Section Observer hook for navigation header scroll spy.
 */
export function useScrollSpy(sectionIds: string[], offset: number = 90): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const computeActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 1. Top of page edge case
      if (scrollY < 100) {
        setActiveId(sectionIds[0]);
        return;
      }

      // 2. Bottom of page edge case (reach contact/footer)
      if (scrollY + viewportHeight >= scrollHeight - 50) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 3. Find section currently under the header reading line
      let currentSection = '';
      let maxOverlap = -1;

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const topRelativeToHeader = rect.top - offset;
        const bottomRelativeToHeader = rect.bottom - offset;

        // If section top has reached or passed header offset, and bottom is still below header
        if (topRelativeToHeader <= 120 && bottomRelativeToHeader > 40) {
          const visibleTop = Math.max(rect.top, offset);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxOverlap) {
            maxOverlap = visibleHeight;
            currentSection = id;
          }
        }
      }

      if (currentSection) {
        setActiveId(currentSection);
      }
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeActiveSection);
    };

    // Initial computation
    computeActiveSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}

