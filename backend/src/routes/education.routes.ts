import { Router } from 'express';
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createEducationSchema, updateEducationSchema } from '../schemas/education.schema.js';

const router = Router();

router.get('/', getEducations);

router.post('/', authenticate, requireAdmin, validate(createEducationSchema), createEducation);
router.put('/:id', authenticate, requireAdmin, validate(updateEducationSchema), updateEducation);
router.delete('/:id', authenticate, requireAdmin, deleteEducation);

export default router;
