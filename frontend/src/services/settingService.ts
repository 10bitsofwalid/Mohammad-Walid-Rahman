import { apiClient } from './apiClient';
import { SiteSettings } from '../types';

export const settingService = {
  getSettings: () => apiClient<SiteSettings>('/settings'),
};
