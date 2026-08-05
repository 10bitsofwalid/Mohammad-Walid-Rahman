import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Architecture' | 'Tools';
  proficiency: number;
  icon?: string;
  featured: boolean;
  order: number;
}

const SkillSchema: Schema<ISkill> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'DevOps', 'Architecture', 'Tools'],
      required: true,
    },
    proficiency: { type: Number, required: true, min: 1, max: 100, default: 90 },
    icon: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
