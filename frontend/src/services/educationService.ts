import { apiClient } from './apiClient';
import { Education } from '../types';

export const educationService = {
  getAll: () => apiClient<Education[]>('/education'),

  create: (data: Partial<Education>) =>
    apiClient<Education>('/education', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Education>) =>
    apiClient<Education>(`/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<null>(`/education/${id}`, {
      method: 'DELETE',
    }),
};
