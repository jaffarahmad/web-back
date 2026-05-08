import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = asyncHandler(async (req, res, next) => {
  const [
    totalUsers,
    totalServices,
    totalVisaApps,
    totalIqamaApps,
    totalContacts,
    recentVisaApps,
    recentIqamaApps
  ] = await Promise.all([
    prisma.user.count(),
    prisma.service.count(),
    prisma.visaApplication.count(),
    prisma.iqamaApplication.count(),
    prisma.contact.count(),
    prisma.visaApplication.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.iqamaApplication.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  apiResponse(res, 200, 'Dashboard statistics retrieved', {
    totals: {
      users: totalUsers,
      services: totalServices,
      applications: totalVisaApps + totalIqamaApps,
      contacts: totalContacts,
    },
    recentApplications: [
      ...recentVisaApps.map(app => ({ ...app, type: 'Visa' })),
      ...recentIqamaApps.map(app => ({ ...app, type: 'Iqama' }))
    ].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5),
  });
});
