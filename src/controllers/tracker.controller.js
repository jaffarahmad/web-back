import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import apiResponse from '../utils/apiResponse.js';

// @desc    Track application by trackingId
// @route   GET /api/tracker/:trackingId
// @access  Public
export const trackApplication = asyncHandler(async (req, res, next) => {
  const { trackingId } = req.params;

  let application = null;
  let type = '';

  if (trackingId.startsWith('VISA')) {
    application = await prisma.visaApplication.findUnique({
      where: { trackingId },
    });
    type = 'Visa';
  } else if (trackingId.startsWith('IQAMA')) {
    application = await prisma.iqamaApplication.findUnique({
      where: { trackingId },
    });
    type = 'Iqama';
  }

  if (!application) {
    return next(new ErrorResponse('Application not found with this tracking ID', 404));
  }

  apiResponse(res, 200, `${type} application found`, {
    type,
    status: application.status,
    trackingId: application.trackingId,
    updatedAt: application.updatedAt,
    // Only return limited info for tracking
    details: {
      name: application.fullName || application.employeeName,
      createdAt: application.createdAt,
    }
  });
});
