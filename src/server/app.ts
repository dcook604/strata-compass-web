import express, { Express } from 'express';
import cors from 'cors';
import { requestLogger, errorLogger } from './config';
import authHandler from './routes/auth';

const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(requestLogger);
  app.use(cors());
  app.use(express.json());

  // Routes
  app.post('/api/auth', authHandler);

  // Error handling
  app.use(errorLogger);

  return app;
};

export default createApp;