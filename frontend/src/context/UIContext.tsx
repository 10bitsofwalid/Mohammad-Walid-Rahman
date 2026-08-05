import React from 'react';
import { useUIStore } from '../store/useUIStore';
import { UIContext } from './UIContextDef';

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const uiStore = useUIStore();

  return (
    <UIContext.Provider
      value={{
        isMobileMenuOpen: uiStore.isMobileMenuOpen,
        activeSection: uiStore.activeSection,
        toasts: uiStore.toasts,
        toggleMobileMenu: uiStore.toggleMobileMenu,
        openMobileMenu: uiStore.openMobileMenu,
        closeMobileMenu: uiStore.closeMobileMenu,
        setActiveSection: uiStore.setActiveSection,
        addToast: uiStore.addToast,
        removeToast: uiStore.removeToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
