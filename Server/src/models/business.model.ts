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
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, length: 11 },
    location_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true, length: 11},
    longitude: { type: Number, required: true, length: 11 },
    altitude: { type: Number, required: true, length: 11 },
    business_type_id: { type: Schema.Types.ObjectId, ref: 'BusinessType', length: 11},
    business_activity_id: { type: Schema.Types.ObjectId, ref: 'BusinessActivity', length: 11},
  },
  { timestamps: true }
);

export default mongoose.model<IBusiness>("Business", BusinessSchema, "businesses");
