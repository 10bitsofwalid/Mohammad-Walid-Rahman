import { apiClient } from './apiClient';
import { Project } from '../types';

export const projectService = {
  getAll: (category?: string) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return apiClient<Project[]>(`/projects${query}`);
  },

  getFeatured: () => apiClient<Project[]>('/projects?featured=true'),

  getById: (id: string) => apiClient<Project>(`/projects/${id}`),
};
