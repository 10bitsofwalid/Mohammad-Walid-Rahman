import { Router } from 'express';
import { login, registerAdmin, getMe } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema, registerAdminSchema } from '../schemas/auth.schema.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.middleware.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/register-admin', authLimiter, validate(registerAdminSchema), registerAdmin);
router.get('/me', authenticate, getMe);

export default router;
