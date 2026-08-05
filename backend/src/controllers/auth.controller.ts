import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { signToken } from '../utils/jwt.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken({ id: user._id.toString(), role: user.role });

  res.status(200).json({
    status: 'success',
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const registerAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, adminKey } = req.body;

  const expectedAdminKey = process.env.ADMIN_INIT_KEY || 'apple_admin_secret_key_2026';
  if (adminKey !== expectedAdminKey) {
    return next(new AppError('Invalid admin registration key', 403));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 400));
  }

  const bcrypt = await import('bcryptjs');
  const passwordHash = await bcrypt.default.hash(password, 12);

  const newAdmin = await User.create({
    name,
    email,
    passwordHash,
    role: 'admin',
  });

  const token = signToken({ id: newAdmin._id.toString(), role: newAdmin.role });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
    },
  });
});

export const getMe = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User no longer exists', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  }
);
