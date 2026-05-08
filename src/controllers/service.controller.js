import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import apiResponse from '../utils/apiResponse.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res, next) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const where = {};
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    }),
    prisma.service.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    count: services.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
    data: services,
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = asyncHandler(async (req, res, next) => {
  const service = await prisma.service.findUnique({
    where: { id: req.params.id },
  });

  if (!service) {
    return next(new ErrorResponse('Service not found', 404));
  }

  apiResponse(res, 200, 'Service retrieved', service);
});

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res, next) => {
  const service = await prisma.service.create({
    data: req.body,
  });

  apiResponse(res, 201, 'Service created successfully', service);
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res, next) => {
  let service = await prisma.service.findUnique({
    where: { id: req.params.id },
  });

  if (!service) {
    return next(new ErrorResponse('Service not found', 404));
  }

  service = await prisma.service.update({
    where: { id: req.params.id },
    data: req.body,
  });

  apiResponse(res, 200, 'Service updated successfully', service);
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req, res, next) => {
  const service = await prisma.service.findUnique({
    where: { id: req.params.id },
  });

  if (!service) {
    return next(new ErrorResponse('Service not found', 404));
  }

  await prisma.service.delete({
    where: { id: req.params.id },
  });

  apiResponse(res, 200, 'Service deleted successfully');
});
