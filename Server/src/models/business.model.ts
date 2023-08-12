  import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
  user_id: string;
  location_id: string;
  longitude: number;
  altitude: number;
  business_type_id: string;
  business_activity_id: string;
  deleted:boolean;
}

const BusinessSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, length: 11 },
    location_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true, length: 11},
    longitude: { type: Number, required: true, length: 11 },
    altitude: { type: Number, required: true, length: 11 },
    business_type_id: { type: Schema.Types.ObjectId, ref: 'BusinessType', length: 11},
    business_activity_id: { type: Schema.Types.ObjectId, ref: 'BusinessActivity', length: 11},
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<IBusiness>("Business", BusinessSchema, "businesses");
