import { z } from 'zod';

export const createExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  order: z.number().default(0),
});

export const updateExperienceSchema = createExperienceSchema.partial();
