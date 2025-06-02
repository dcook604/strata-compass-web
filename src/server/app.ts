import express, { Express } from 'express';
import cors from 'cors';
import { requestLogger, errorLogger } from './config';
import authHandler from './routes/auth';
import { createAdminHandler } from './routes/admin';
import { logFrontendError } from './routes/logging';

const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(requestLogger);
  app.use(cors());
  app.use(express.json());

  // Routes
  app.post('/api/auth', authHandler);
  
  // Admin routes
  app.post('/api/create-admin', createAdminHandler);
  
  // Logging routes
  app.post('/api/log-error', logFrontendError);

  // Error handling
  app.use(errorLogger);

  return app;
};

export default createApp;