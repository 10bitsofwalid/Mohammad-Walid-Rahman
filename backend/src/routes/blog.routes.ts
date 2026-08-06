import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createBlogSchema, updateBlogSchema } from '../schemas/blog.schema.js';

const router = Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

router.post('/', authenticate, requireAdmin, validate(createBlogSchema), createBlog);
router.put('/:id', authenticate, requireAdmin, validate(updateBlogSchema), updateBlog);
router.delete('/:id', authenticate, requireAdmin, deleteBlog);

export default router;
