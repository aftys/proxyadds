import mongoose, { Document, Schema } from "mongoose";

export interface IBusinessActivity extends Document {
  name: string;
}

const BusinessActivitySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBusinessActivity>(
  "BusinessActivity",
  BusinessActivitySchema,
  "business_activities"
);
