import { Request, Response, NextFunction } from 'express';
import { Education } from '../models/Education.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getEducations = catchAsync(async (_req: Request, res: Response) => {
  const educations = await Education.find().sort({ order: 1, startDate: -1 });

  res.status(200).json({
    status: 'success',
    results: educations.length,
    data: educations,
  });
});

export const createEducation = catchAsync(async (req: Request, res: Response) => {
  const newEducation = await Education.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newEducation,
  });
});

export const updateEducation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEducation) {
      return next(new AppError('Education entry not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: updatedEducation,
    });
  }
);

export const deleteEducation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);

    if (!deletedEducation) {
      return next(new AppError('Education entry not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
