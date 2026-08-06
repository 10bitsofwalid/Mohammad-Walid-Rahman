import { apiClient } from './apiClient';
import { SiteSettings } from '../types';

export const settingService = {
  getSettings: () => apiClient<SiteSettings>('/settings'),

  updateSettings: (settings: Partial<SiteSettings>) =>
    apiClient<SiteSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};
