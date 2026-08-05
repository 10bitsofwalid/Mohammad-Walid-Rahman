import { Router } from 'express';
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createExperienceSchema, updateExperienceSchema } from '../schemas/experience.schema.js';

const router = Router();

router.get('/', getExperiences);
router.get('/:id', getExperience);

router.post('/', authenticate, requireAdmin, validate(createExperienceSchema), createExperience);
router.put('/:id', authenticate, requireAdmin, validate(updateExperienceSchema), updateExperience);
router.delete('/:id', authenticate, requireAdmin, deleteExperience);

export default router;
