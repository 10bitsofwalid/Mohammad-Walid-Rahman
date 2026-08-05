import { apiClient } from './apiClient';
import { Skill } from '../types';

export const skillService = {
  getAll: () => apiClient<Skill[]>('/skills'),

  getByCategory: (category: string) =>
    apiClient<Skill[]>(`/skills?category=${encodeURIComponent(category)}`),

  getFeatured: () => apiClient<Skill[]>('/skills?featured=true'),
};
