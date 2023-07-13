import mongoose, { Document, Schema } from "mongoose";

export interface ISchedule extends Document {
  opening_hour: string;
  closing_hour: string;
  day: string;
  business_id: number;
}

const ScheduleSchema: Schema = new Schema(
  {
    opening_hour: { type: String, required: true },
    closing_hour: { type: String, required: true },
    day: { type: String, required: true, length: 10 },
    business_id: { type: Schema.Types.ObjectId, ref: 'Business', length: 11, required: true },

  },
  { timestamps: true }
);

export default mongoose.model<ISchedule>("Schedule", ScheduleSchema, "schedules");
