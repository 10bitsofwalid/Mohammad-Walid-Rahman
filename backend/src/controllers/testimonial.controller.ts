import { Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models/Testimonial.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getTestimonials = catchAsync(async (req: Request, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (req.query.featured === 'true') {
    filter.featured = true;
  }

  const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: testimonials.length,
    data: testimonials,
  });
});

export const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const newTestimonial = await Testimonial.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newTestimonial,
  });
});

export const updateTestimonial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTestimonial) {
      return next(new AppError('Testimonial not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: updatedTestimonial,
    });
  }
);

export const deleteTestimonial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!deletedTestimonial) {
      return next(new AppError('Testimonial not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
