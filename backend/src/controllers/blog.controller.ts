import { Request, Response, NextFunction } from 'express';
import { Blog } from '../models/Blog.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.category) filter.category = req.query.category;

  const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: blogs,
  });
});

export const getBlogBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return next(new AppError('Article not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: blog,
    });
  }
);

export const createBlog = catchAsync(async (req: Request, res: Response) => {
  let { slug, title } = req.body;
  if (!slug && title) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  const newBlog = await Blog.create({ ...req.body, slug });

  res.status(201).json({
    status: 'success',
    data: newBlog,
  });
});

export const updateBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    return next(new AppError('Article not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedBlog,
  });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

  if (!deletedBlog) {
    return next(new AppError('Article not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
