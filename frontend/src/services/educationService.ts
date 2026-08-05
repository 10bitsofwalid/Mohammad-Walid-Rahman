import { apiClient } from './apiClient';
import { Education } from '../types';

export const educationService = {
  getAll: () => apiClient<Education[]>('/education'),
};
