import mongoose, { Document, Schema } from "mongoose";

export interface IPlacement extends Document {
  name: string;
  business_id: number;
}

const PlacementSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    business_id: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPlacement>("Placement", PlacementSchema, "placements");
