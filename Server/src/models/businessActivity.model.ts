import mongoose, { Document, Schema } from "mongoose";

export interface IBusinessActivity extends Document {
  name: string;
  deleted: boolean;
}

const BusinessActivitySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<IBusinessActivity>(
  "BusinessActivity",
  BusinessActivitySchema,
  "business_activities"
);
