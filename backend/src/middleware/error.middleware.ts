import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  code?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let status = err.status || 'error';
  let message = err.message || 'Something went wrong';
  let isOperational = err.isOperational || false;
  const stack = err.stack;

  if (err.name === 'CastError') {
    statusCode = 404;
    status = 'fail';
    message = 'Resource not found (invalid ID format)';
    isOperational = true;
  }

  if (err.code === 11000) {
    statusCode = 400;
    status = 'fail';
    message = 'Duplicate field value entered';
    isOperational = true;
  }

  logger.error(`[${statusCode}] ${message}`, err);

  if (env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status,
      message,
      stack,
    });
  } else {
    if (isOperational) {
      res.status(statusCode).json({
        status,
        message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }
};
