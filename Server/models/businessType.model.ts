import mongoose, { Document, Schema } from "mongoose";

export interface IBusinessType extends Document {
  name: string;
}

const BusinessTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBusinessType>("BusinessType", BusinessTypeSchema, "business_types");
