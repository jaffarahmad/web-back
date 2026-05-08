import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Prisma unique constraint error
  if (err.code === 'P2002') {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
