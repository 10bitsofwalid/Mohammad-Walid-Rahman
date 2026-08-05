import { Router } from 'express';
import authRoutes from './auth.routes.js';
import experienceRoutes from './experience.routes.js';
import projectRoutes from './project.routes.js';
import educationRoutes from './education.routes.js';
import skillRoutes from './skill.routes.js';
import socialRoutes from './social.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import messageRoutes from './message.routes.js';
import settingRoutes from './setting.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/experiences', experienceRoutes);
router.use('/projects', projectRoutes);
router.use('/education', educationRoutes);
router.use('/skills', skillRoutes);
router.use('/socials', socialRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/messages', messageRoutes);
router.use('/settings', settingRoutes);

export default router;
