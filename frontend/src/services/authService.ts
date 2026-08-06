import { apiClient } from './apiClient';

export interface LoginResponseData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthLoginResponse {
  token: string;
  user: LoginResponseData;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthLoginResponse> => {
    const url = '/api/v1/auth/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Authentication failed');
    }

    const json = await response.json();
    return {
      token: json.token,
      user: json.data,
    };
  },

  getMe: () => apiClient<LoginResponseData>('/auth/me'),
};
