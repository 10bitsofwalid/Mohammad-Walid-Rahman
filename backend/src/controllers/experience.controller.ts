import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getExperiences = catchAsync(async (_req: Request, res: Response) => {
  const experiences = await Experience.find().sort({ order: 1, startDate: -1 });

  res.status(200).json({
    status: 'success',
    results: experiences.length,
    data: experiences,
  });
});

export const getExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    return next(new AppError('Experience entry not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: experience,
  });
});

export const createExperience = catchAsync(async (req: Request, res: Response) => {
  const newExperience = await Experience.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newExperience,
  });
});

export const updateExperience = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExperience) {
      return next(new AppError('Experience entry not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: updatedExperience,
    });
  }
);

export const deleteExperience = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);

    if (!deletedExperience) {
      return next(new AppError('Experience entry not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
