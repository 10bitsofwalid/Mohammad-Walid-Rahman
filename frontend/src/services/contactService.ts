import { apiClient } from './apiClient';
import { ContactMessagePayload } from '../types';

export interface ContactMessageItem {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  archived?: boolean;
  createdAt: string;
}

export const contactService = {
  sendMessage: (payload: ContactMessagePayload) =>
    apiClient<{ message: string }>('/messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMessages: (archived = false) =>
    apiClient<ContactMessageItem[]>(`/messages?archived=${archived}`),

  updateStatus: (id: string, updates: Partial<ContactMessageItem>) =>
    apiClient<ContactMessageItem>(`/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  deleteMessage: (id: string) =>
    apiClient<null>(`/messages/${id}`, {
      method: 'DELETE',
    }),
};
