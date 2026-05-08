import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { createServiceSchema, updateServiceSchema } from '../validations/service.validation.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);

// Protected routes (Admin only)
router.post('/', protect, authorize('ADMIN'), validate(createServiceSchema), createService);
router.put('/:id', protect, authorize('ADMIN'), validate(updateServiceSchema), updateService);
router.delete('/:id', protect, authorize('ADMIN'), deleteService);

export default router;
