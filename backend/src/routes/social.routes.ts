import { Router } from 'express';
import {
  getSocials,
  getAllSocialsAdmin,
  createSocial,
  updateSocial,
  deleteSocial,
} from '../controllers/social.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createSocialSchema, updateSocialSchema } from '../schemas/social.schema.js';

const router = Router();

router.get('/', getSocials);
router.get('/admin', authenticate, requireAdmin, getAllSocialsAdmin);
router.post('/', authenticate, requireAdmin, validate(createSocialSchema), createSocial);
router.put('/:id', authenticate, requireAdmin, validate(updateSocialSchema), updateSocial);
router.delete('/:id', authenticate, requireAdmin, deleteSocial);

export default router;
