import { createContext } from 'react';
import { ToastNotification } from '../store/useUIStore';

export interface UIContextType {
  isMobileMenuOpen: boolean;
  activeSection: string;
  toasts: ToastNotification[];
  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  setActiveSection: (sectionId: string) => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);
