import express from 'express';
import {
  applyIqama,
  getIqamaApplications,
  updateIqamaStatus,
} from '../controllers/iqama.controller.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { iqamaApplicationSchema } from '../validations/iqama.validation.js';

const router = express.Router();

router.post('/', protect, validate(iqamaApplicationSchema), applyIqama);

// Admin only routes
router.get('/', protect, authorize('ADMIN'), getIqamaApplications);
router.patch('/:id/status', protect, authorize('ADMIN'), updateIqamaStatus);

export default router;
