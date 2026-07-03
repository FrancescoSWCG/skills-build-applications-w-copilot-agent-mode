import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  calories: number;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: true },
  calories: { type: Number, required: true },
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
