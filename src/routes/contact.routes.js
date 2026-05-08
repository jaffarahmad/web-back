import express from 'express';
import { submitContact, getContacts } from '../controllers/contact.controller.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { contactSchema } from '../validations/contact.validation.js';

const router = express.Router();

router.post('/', validate(contactSchema), submitContact);

// Admin only
router.get('/', protect, authorize('ADMIN'), getContacts);

export default router;
