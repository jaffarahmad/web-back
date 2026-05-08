import app from './src/app.js';
import prisma from './src/config/prisma.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log('MongoDB Connected via Prisma...');

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log('Press CTRL-C to stop');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      console.log(`Error: ${err.message}`);
      // Close server & exit process
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
