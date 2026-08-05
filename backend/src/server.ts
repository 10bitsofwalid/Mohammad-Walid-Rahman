import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
    logger.info(`API Base URL: http://localhost:${env.PORT}/api/v1`);
  });

  process.on('unhandledRejection', (err: Error) => {
    logger.error('UNHANDLED REJECTION! Shutting down server...', err);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('uncaughtException', (err: Error) => {
    logger.error('UNCAUGHT EXCEPTION! Shutting down server...', err);
    process.exit(1);
  });
};

startServer();
