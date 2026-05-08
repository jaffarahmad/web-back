import { ZodError } from 'zod';
import ErrorResponse from '../utils/errorResponse.js';

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors.map((e) => e.message).join(', ');
      return next(new ErrorResponse(message, 400));
    }
    next(error);
  }
};

export default validate;
