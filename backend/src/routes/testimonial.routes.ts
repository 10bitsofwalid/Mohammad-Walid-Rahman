import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createTestimonialSchema, updateTestimonialSchema } from '../schemas/testimonial.schema.js';

const router = Router();

router.get('/', getTestimonials);

router.post('/', authenticate, requireAdmin, validate(createTestimonialSchema), createTestimonial);
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateTestimonialSchema),
  updateTestimonial
);
router.delete('/:id', authenticate, requireAdmin, deleteTestimonial);

export default router;
