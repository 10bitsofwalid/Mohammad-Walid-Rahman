import { z } from 'zod';

export const createEducationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  grade: z.string().optional(),
  activities: z.array(z.string()).default([]),
  order: z.number().default(0),
});

export const updateEducationSchema = createEducationSchema.partial();
