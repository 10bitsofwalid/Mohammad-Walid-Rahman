import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/Message.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const createMessage = catchAsync(async (req: Request, res: Response) => {
  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.ip;

  const newMessage = await Message.create({
    ...req.body,
    ipAddress,
  });

  res.status(201).json({
    status: 'success',
    message: 'Message sent successfully',
    data: {
      id: newMessage._id,
      createdAt: newMessage.createdAt,
    },
  });
});

export const getMessagesAdmin = catchAsync(async (req: Request, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (req.query.archived === 'true') {
    filter.archived = true;
  } else {
    filter.archived = false;
  }

  const messages = await Message.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages,
  });
});

export const updateMessageStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMessage) {
      return next(new AppError('Message not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: updatedMessage,
    });
  }
);

export const deleteMessageAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return next(new AppError('Message not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
