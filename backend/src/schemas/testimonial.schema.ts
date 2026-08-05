import { z } from 'zod';

export const createTestimonialSchema = z.object({
  author: z.string().min(1, 'Author is required'),
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  avatar: z.string().optional(),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.number().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
