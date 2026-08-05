import { Request, Response } from 'express';
import { Setting } from '../models/Setting.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getSettings = catchAsync(async (_req: Request, res: Response) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({
      siteTitle: 'Senior Software Engineer Portfolio',
      bio: 'Architecting scalable web applications, distributed systems, and Apple-grade digital experiences.',
      statusMessage: 'Open for high-impact technical consulting & engineering roles.',
      availability: 'Available for work',
      contactEmail: 'walid@example.com',
      maintenanceMode: false,
    });
  }

  res.status(200).json({
    status: 'success',
    data: settings,
  });
});

export const updateSettingsAdmin = catchAsync(async (req: Request, res: Response) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create(req.body);
  } else {
    settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    status: 'success',
    data: settings,
  });
});
