import mongoose, { Schema, Document } from 'mongoose';

export interface ISocial extends Document {
  platform: string;
  url: string;
  icon?: string;
  username?: string;
  enabled: boolean;
  order: number;
}

const SocialSchema: Schema<ISocial> = new Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String },
    username: { type: String },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Social = mongoose.model<ISocial>('Social', SocialSchema);
