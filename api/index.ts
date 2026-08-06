import type { IncomingMessage, ServerResponse } from 'http';
import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/config/db.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await connectDB();
  return app(req, res);
}
