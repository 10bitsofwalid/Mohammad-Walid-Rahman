import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  siteTitle: string;
  bio: string;
  statusMessage?: string;
  availability: 'Available for work' | 'Contract only' | 'Unavailable';
  contactEmail: string;
  analyticsId?: string;
  maintenanceMode: boolean;
}

const SettingSchema: Schema<ISetting> = new Schema(
  {
    siteTitle: { type: String, required: true, default: 'Senior Software Engineer Portfolio' },
    bio: { type: String, required: true },
    statusMessage: { type: String },
    availability: {
      type: String,
      enum: ['Available for work', 'Contract only', 'Unavailable'],
      default: 'Available for work',
    },
    contactEmail: { type: String, required: true },
    analyticsId: { type: String },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Setting = mongoose.model<ISetting>('Setting', SettingSchema);
