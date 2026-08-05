import { Router } from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skill.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createSkillSchema, updateSkillSchema } from '../schemas/skill.schema.js';

const router = Router();

router.get('/', getSkills);

router.post('/', authenticate, requireAdmin, validate(createSkillSchema), createSkill);
router.put('/:id', authenticate, requireAdmin, validate(updateSkillSchema), updateSkill);
router.delete('/:id', authenticate, requireAdmin, deleteSkill);

export default router;
