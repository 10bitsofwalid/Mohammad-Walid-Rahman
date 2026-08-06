import mongoose from 'mongoose';
import dns from 'dns';
import bcrypt from 'bcryptjs';
import { env } from './env.js';
import { logger } from '../utils/logger.js';
import { User } from '../models/User.model.js';

const ensureAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = 'walidrahman.officials@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('walid-435-officials', 12);
      await User.create({
        name: 'Mohammad Walid Rahman',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
      logger.info(`Default admin user (${adminEmail}) auto-initialized successfully.`);
    }
  } catch (err: any) {
    logger.warn(`Failed to ensure default admin user: ${err?.message || err}`);
  }
};

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch {
      // Ignore if system restricts custom DNS servers
    }
    const conn = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    await ensureAdminUser();
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

