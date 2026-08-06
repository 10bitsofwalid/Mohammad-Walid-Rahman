import { Request, Response } from 'express';
import { Setting } from '../models/Setting.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getSettings = catchAsync(async (_req: Request, res: Response) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({
      siteTitle: 'Mohammad Walid Rahman | Full Stack Developer',
      authorName: 'Mohammad Walid Rahman',
      roleTitle: 'Full Stack Developer',
      bio: 'Software Engineering undergraduate at Daffodil International University, building real projects to learn full-stack development — from C-based data structure systems to Node.js/Express APIs, React frontends and Cross Platforms.',
      statusMessage: 'Open to Internship / Full-time Opportunities',
      availability: 'Available for work',
      contactEmail: 'walidrahman.officials@gmail.com',
      location: 'Uttara, Dhaka-1230, Bangladesh',
      availabilityStatus: '🟢 Open to Opportunities',
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
