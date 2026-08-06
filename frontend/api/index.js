import app from '../../backend/dist/app.js';
import { connectDB } from '../../backend/dist/config/db.js';

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
