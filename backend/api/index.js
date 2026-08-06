import app from '../dist/app.js';
import { connectDB } from '../dist/config/db.js';

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
