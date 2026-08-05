import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  author: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  rating: number;
  featured: boolean;
  order: number;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    avatar: { type: String },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
