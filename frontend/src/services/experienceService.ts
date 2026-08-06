import { apiClient } from './apiClient';
import { Experience } from '../types';

export const experienceService = {
  getAll: () => apiClient<Experience[]>('/experiences'),

  getById: (id: string) => apiClient<Experience>(`/experiences/${id}`),

  create: (data: Partial<Experience>) =>
    apiClient<Experience>('/experiences', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Experience>) =>
    apiClient<Experience>(`/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<null>(`/experiences/${id}`, {
      method: 'DELETE',
    }),
};
