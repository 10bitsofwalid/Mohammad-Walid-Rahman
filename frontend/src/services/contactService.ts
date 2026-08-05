import { apiClient } from './apiClient';
import { ContactMessagePayload } from '../types';

export const contactService = {
  sendMessage: (payload: ContactMessagePayload) =>
    apiClient<{ message: string }>('/messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
