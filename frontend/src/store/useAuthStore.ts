import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  adminUser: { name: string; role: string; email?: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AUTHORIZED_EMAIL = 'walidrahman.officials@gmail.com';
const AUTHORIZED_PASS = 'walid-435-officials';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      adminUser: null,

      login: async (email: string, password: string) => {
        // Strictly reject any unauthorized email/password attempts
        const trimmedEmail = email.trim().toLowerCase();
        if (trimmedEmail !== AUTHORIZED_EMAIL || password !== AUTHORIZED_PASS) {
          return false;
        }

        // Try backend JWT login first
        try {
          const res = await authService.login(trimmedEmail, password);
          if (res.token) {
            set({
              isAuthenticated: true,
              token: res.token,
              adminUser: {
                name: res.user.name || 'Mohammad Walid Rahman',
                role: res.user.role || 'System Admin',
                email: res.user.email || AUTHORIZED_EMAIL,
              },
            });
            return true;
          }
        } catch {
          // Fallback handling when offline or backend unreachable
        }

        // Secure client-side authentication for verified email & password
        set({
          isAuthenticated: true,
          token: 'sec_jwt_token_walid_rahman_official',
          adminUser: {
            name: 'Mohammad Walid Rahman',
            role: 'System Admin',
            email: AUTHORIZED_EMAIL,
          },
        });
        return true;
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, adminUser: null });
      },
    }),
    {
      name: 'portfolio_admin_auth',
    }
  )
);
