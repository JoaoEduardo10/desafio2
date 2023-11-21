/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api-error';

export const globalsErrorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ error: error.message });
};
