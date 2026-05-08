import express from 'express';
import authRoutes from './auth.routes.js';
import serviceRoutes from './service.routes.js';
import visaRoutes from './visa.routes.js';
import iqamaRoutes from './iqama.routes.js';
import trackerRoutes from './tracker.routes.js';
import contactRoutes from './contact.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/visa', visaRoutes);
router.use('/iqama', iqamaRoutes);
router.use('/tracker', trackerRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);

export default router;
