import { Router } from 'express';
import { getSettings, updateSettingsAdmin } from '../controllers/setting.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { updateSettingSchema } from '../schemas/setting.schema.js';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticate, requireAdmin, validate(updateSettingSchema), updateSettingsAdmin);

export default router;
