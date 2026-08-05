import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getProjects = catchAsync(async (req: Request, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (req.query.featured === 'true') {
    filter.featured = true;
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: projects,
  });
});

export const getProjectBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: project,
    });
  }
);

export const createProject = catchAsync(async (req: Request, res: Response) => {
  const newProject = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newProject,
  });
});

export const updateProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    return next(new AppError('Project not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedProject,
  });
});

export const deleteProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedProject = await Project.findByIdAndDelete(req.params.id);

  if (!deletedProject) {
    return next(new AppError('Project not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
