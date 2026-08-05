import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  images: z.array(z.string()).default([]),
  liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  category: z.string().default('Web Architecture'),
  featured: z.boolean().default(false),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  order: z.number().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();
