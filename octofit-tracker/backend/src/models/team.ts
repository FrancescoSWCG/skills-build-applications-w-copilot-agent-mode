import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  focus: string;
  weeklyGoal: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  focus: { type: String, required: true },
  weeklyGoal: { type: String, required: true },
});

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
