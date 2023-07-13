import mongoose, { Document, Schema } from "mongoose";

export interface ITracking extends Document {
  type: string;
  date: Date;
  display_time: string;
  campaign_id: number;
}

const TrackingSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    date: { type: Date, required: true },
    display_time: { type: String, required: true },
    campaign_id: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITracking>("Tracking", TrackingSchema, "trackings");
