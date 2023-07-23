import mongoose, { Document, Schema } from "mongoose";

export interface IPlacement extends Document {
  name: string;
  business_id: number;
  deleted: boolean;
}

const PlacementSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    business_id: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<IPlacement>("Placement", PlacementSchema, "placements");
