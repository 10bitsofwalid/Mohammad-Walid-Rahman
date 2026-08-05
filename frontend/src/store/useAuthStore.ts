import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  adminUser: { name: string; role: string } | null;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminUser: null,

      login: (password: string) => {
        // Admin credentials validation
        if (password === 'admin123' || password === 'walid2024') {
          set({
            isAuthenticated: true,
            adminUser: { name: 'Walid Rahman', role: 'System Admin' },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, adminUser: null });
      },
    }),
    {
      name: 'portfolio_admin_auth',
    }
  )
);
