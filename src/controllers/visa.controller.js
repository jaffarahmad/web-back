import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import apiResponse from '../utils/apiResponse.js';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate tracking ID
const generateTrackingId = () => `VISA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

// @desc    Apply for Visa
// @route   POST /api/visa
// @access  Private
export const applyVisa = asyncHandler(async (req, res, next) => {
  const trackingId = generateTrackingId();

  const visaApplication = await prisma.visaApplication.create({
    data: {
      ...req.body,
      trackingId,
    },
  });

  apiResponse(res, 201, 'Visa application submitted successfully', visaApplication);
});

// @desc    Get all visa applications (Admin only)
// @route   GET /api/visa
// @access  Private/Admin
export const getVisaApplications = asyncHandler(async (req, res, next) => {
  const applications = await prisma.visaApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  apiResponse(res, 200, 'Visa applications retrieved', applications);
});

// @desc    Update visa status (Admin only)
// @route   PATCH /api/visa/:id/status
// @access  Private/Admin
export const updateVisaStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const application = await prisma.visaApplication.update({
    where: { id: req.params.id },
    data: { status },
  });

  apiResponse(res, 200, 'Visa application status updated', application);
});
