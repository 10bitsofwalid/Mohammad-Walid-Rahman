import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getSkills = catchAsync(async (req: Request, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }

  const skills = await Skill.find(filter).sort({ order: 1, proficiency: -1 });

  res.status(200).json({
    status: 'success',
    results: skills.length,
    data: skills,
  });
});

export const createSkill = catchAsync(async (req: Request, res: Response) => {
  const newSkill = await Skill.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newSkill,
  });
});

export const updateSkill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSkill) {
    return next(new AppError('Skill not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedSkill,
  });
});

export const deleteSkill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

  if (!deletedSkill) {
    return next(new AppError('Skill not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
