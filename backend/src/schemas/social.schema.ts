import { z } from 'zod';

export const createSocialSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().optional(),
  username: z.string().optional(),
  enabled: z.boolean().default(true),
  order: z.number().default(0),
});

export const updateSocialSchema = createSocialSchema.partial();
