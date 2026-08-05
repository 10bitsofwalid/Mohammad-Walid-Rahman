import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  thumbnail: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  order: number;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    technologies: [{ type: String }],
    category: { type: String, required: true, default: 'Web Architecture' },
    featured: { type: Boolean, default: false },
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
