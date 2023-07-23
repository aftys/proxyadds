import mongoose, { Document, Schema } from "mongoose";

export interface IParameter extends Document {
  ad_price_advertiser: number;
  ad_price_business: number;
  com_display_time: number;
  deleted:boolean;
}

const ParameterSchema: Schema = new Schema(
  {
    ad_price_advertiser: { type: Number, required: true },
    ad_price_business: { type: Number, required: true },
    com_display_time: { type: Number, required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<IParameter>("Parameter", ParameterSchema, "parameters");
