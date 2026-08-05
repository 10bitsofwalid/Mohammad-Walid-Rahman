import { apiClient } from './apiClient';
import { Experience } from '../types';

export const experienceService = {
  getAll: () => apiClient<Experience[]>('/experiences'),

  getById: (id: string) => apiClient<Experience>(`/experiences/${id}`),
};
