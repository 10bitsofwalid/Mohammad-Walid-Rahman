import { z } from 'zod';

export const updateSettingSchema = z.object({
  siteTitle: z.string().optional(),
  bio: z.string().optional(),
  statusMessage: z.string().optional(),
  availability: z.enum(['Available for work', 'Contract only', 'Unavailable']).optional(),
  contactEmail: z.string().email('Invalid email address').optional(),
  analyticsId: z.string().optional(),
  maintenanceMode: z.boolean().optional(),
});
