import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
  user_id: number;
  location_id: number;
  longitude: number;
  altitude: number;
  business_type_id: number;
  business_activity_id: number;
}

const BusinessSchema: Schema = new Schema(
  {
    user_id: { type: Number, required: true },
    location_id: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, required: true },
    business_type_id: { type: Number, required: true },
    business_activity_id: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBusiness>("Business", BusinessSchema, "businesses");
