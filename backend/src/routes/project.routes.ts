import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

router.post('/', authenticate, requireAdmin, validate(createProjectSchema), createProject);
router.put('/:id', authenticate, requireAdmin, validate(updateProjectSchema), updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);

export default router;
