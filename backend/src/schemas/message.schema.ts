import { z } from 'zod';

export const createMessageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters long'),
});

export const updateMessageStatusSchema = z.object({
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
});
