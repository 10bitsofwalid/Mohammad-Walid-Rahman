import { apiClient } from './apiClient';
import { Skill } from '../types';

export const skillService = {
  getAll: () => apiClient<Skill[]>('/skills'),

  getByCategory: (category: string) =>
    apiClient<Skill[]>(`/skills?category=${encodeURIComponent(category)}`),

  getFeatured: () => apiClient<Skill[]>('/skills?featured=true'),

  create: (data: Partial<Skill>) =>
    apiClient<Skill>('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Skill>) =>
    apiClient<Skill>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<null>(`/skills/${id}`, {
      method: 'DELETE',
    }),
};
