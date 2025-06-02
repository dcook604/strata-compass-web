import { RequestHandler } from 'express';
import { logger } from '../config';

interface FrontendError {
  message: string;
  stack?: string;
  componentStack?: string;
  context?: Record<string, unknown>;
}

export const logFrontendError: RequestHandler = async (req, res) => {
  const error = req.body as FrontendError;
  
  logger.error('Frontend error:', {
    message: error.message,
    stack: error.stack,
    componentStack: error.componentStack,
    context: error.context,
    timestamp: new Date().toISOString()
  });

  res.status(200).json({ success: true });
};