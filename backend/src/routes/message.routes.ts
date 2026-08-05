import { Router } from 'express';
import {
  createMessage,
  getMessagesAdmin,
  updateMessageStatus,
  deleteMessageAdmin,
} from '../controllers/message.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createMessageSchema, updateMessageStatusSchema } from '../schemas/message.schema.js';
import { apiLimiter } from '../middleware/rateLimiter.middleware.js';

const router = Router();

router.post('/', apiLimiter, validate(createMessageSchema), createMessage);
router.get('/', authenticate, requireAdmin, getMessagesAdmin);
router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateMessageStatusSchema),
  updateMessageStatus
);
router.delete('/:id', authenticate, requireAdmin, deleteMessageAdmin);

export default router;
