import express from 'express';
import {
  applyVisa,
  getVisaApplications,
  updateVisaStatus,
} from '../controllers/visa.controller.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { visaApplicationSchema } from '../validations/visa.validation.js';

const router = express.Router();

router.post('/', protect, validate(visaApplicationSchema), applyVisa);

// Admin only routes
router.get('/', protect, authorize('ADMIN'), getVisaApplications);
router.patch('/:id/status', protect, authorize('ADMIN'), updateVisaStatus);

export default router;
