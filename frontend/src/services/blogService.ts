import { apiClient } from './apiClient';
import { BlogPost } from '../types';

export const blogService = {
  getAll: (category?: string) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return apiClient<BlogPost[]>(`/blogs${query}`);
  },

  getBySlug: (slug: string) => apiClient<BlogPost>(`/blogs/${slug}`),

  create: (data: Partial<BlogPost>) =>
    apiClient<BlogPost>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<BlogPost>) =>
    apiClient<BlogPost>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<null>(`/blogs/${id}`, {
      method: 'DELETE',
    }),
};
