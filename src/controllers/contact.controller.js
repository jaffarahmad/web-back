import prisma from '../config/prisma.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res, next) => {
  const contact = await prisma.contact.create({
    data: req.body,
  });

  apiResponse(res, 201, 'Message sent successfully', contact);
});

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  apiResponse(res, 200, 'Contact messages retrieved', contacts);
});
