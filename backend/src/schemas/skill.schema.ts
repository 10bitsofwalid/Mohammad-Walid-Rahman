import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Frontend', 'Backend', 'DevOps', 'Architecture', 'Tools']),
  proficiency: z.number().min(1).max(100).default(90),
  icon: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const updateSkillSchema = createSkillSchema.partial();
