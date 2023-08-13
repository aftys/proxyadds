import mongoose, { Document, Schema } from "mongoose";

export interface IBusinessType extends Document {
  name: string;
  deleted: boolean,
}

const BusinessTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    activity_id: { type: Schema.Types.ObjectId, ref: 'BusinessActivity', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<IBusinessType>("BusinessType", BusinessTypeSchema, "business_types");
