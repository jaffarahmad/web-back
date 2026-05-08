import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorMiddleware.js';
import routes from './routes/index.js';
import ErrorResponse from './utils/errorResponse.js';

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api', routes);

// 404 Route handler
app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler
app.use(errorHandler);

export default app;
