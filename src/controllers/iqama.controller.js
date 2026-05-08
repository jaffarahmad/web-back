import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import apiResponse from '../utils/apiResponse.js';

// Helper to generate tracking ID
const generateTrackingId = () => `IQAMA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

// @desc    Apply for Iqama
// @route   POST /api/iqama
// @access  Private
export const applyIqama = asyncHandler(async (req, res, next) => {
  const trackingId = generateTrackingId();

  const iqamaApplication = await prisma.iqamaApplication.create({
    data: {
      ...req.body,
      trackingId,
    },
  });

  apiResponse(res, 201, 'Iqama application submitted successfully', iqamaApplication);
});

// @desc    Get all iqama applications (Admin only)
// @route   GET /api/iqama
// @access  Private/Admin
export const getIqamaApplications = asyncHandler(async (req, res, next) => {
  const applications = await prisma.iqamaApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  apiResponse(res, 200, 'Iqama applications retrieved', applications);
});

// @desc    Update iqama status (Admin only)
// @route   PATCH /api/iqama/:id/status
// @access  Private/Admin
export const updateIqamaStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const application = await prisma.iqamaApplication.update({
    where: { id: req.params.id },
    data: { status },
  });

  apiResponse(res, 200, 'Iqama application status updated', application);
});
