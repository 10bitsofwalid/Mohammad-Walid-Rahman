import { apiClient } from './apiClient';
import { BlogPost } from '../types';

export const blogService = {
  getAll: (category?: string) => {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return apiClient<BlogPost[]>(`/blogs${query}`);
  },
  getBySlug: (slug: string) => apiClient<BlogPost>(`/blogs/${slug}`),
};
