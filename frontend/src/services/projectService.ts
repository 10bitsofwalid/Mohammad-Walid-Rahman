import { apiClient } from './apiClient';
import { Project } from '../types';

export const projectService = {
  getAll: (category?: string) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return apiClient<Project[]>(`/projects${query}`);
  },

  getFeatured: () => apiClient<Project[]>('/projects?featured=true'),

  getById: (id: string) => apiClient<Project>(`/projects/${id}`),

  create: (data: Partial<Project>) =>
    apiClient<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Project>) =>
    apiClient<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<null>(`/projects/${id}`, {
      method: 'DELETE',
    }),
};
