import { Request, Response, NextFunction } from 'express';
import { Social } from '../models/Social.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getSocials = catchAsync(async (_req: Request, res: Response) => {
  const socials = await Social.find({ enabled: true }).sort({ order: 1 });

  res.status(200).json({
    status: 'success',
    results: socials.length,
    data: socials,
  });
});

export const getAllSocialsAdmin = catchAsync(async (_req: Request, res: Response) => {
  const socials = await Social.find().sort({ order: 1 });

  res.status(200).json({
    status: 'success',
    results: socials.length,
    data: socials,
  });
});

export const createSocial = catchAsync(async (req: Request, res: Response) => {
  const newSocial = await Social.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newSocial,
  });
});

export const updateSocial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updatedSocial = await Social.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSocial) {
    return next(new AppError('Social profile not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedSocial,
  });
});

export const deleteSocial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedSocial = await Social.findByIdAndDelete(req.params.id);

  if (!deletedSocial) {
    return next(new AppError('Social profile not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
