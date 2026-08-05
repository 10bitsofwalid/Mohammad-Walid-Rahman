import React, { useEffect, useState } from 'react';

interface AppRouterProps {
  children: React.ReactNode;
}

export const AppRouter: React.FC<AppRouterProps> = ({ children }) => {
  const [currentHash, setCurrentHash] = useState<string>(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      const targetId = window.location.hash.replace('#', '');
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <div data-current-hash={currentHash}>{children}</div>;
};
