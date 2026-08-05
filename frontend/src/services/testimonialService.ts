import { apiClient } from './apiClient';
import { Testimonial } from '../types';

export const testimonialService = {
  getAll: () => apiClient<Testimonial[]>('/testimonials'),
};
