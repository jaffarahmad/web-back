import express from 'express';
import { trackApplication } from '../controllers/tracker.controller.js';

const router = express.Router();

router.get('/:trackingId', trackApplication);

export default router;
