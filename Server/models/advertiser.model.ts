import mongoose, { Document, Schema } from "mongoose";

export interface IAdvertiser extends Document {
  user_id: number;
  act_id: number;
}

const AdvertiserSchema: Schema = new Schema(
  {
    user_id: { type: Number, required: true },
    act_id: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAdvertiser>("Advertiser", AdvertiserSchema, "advertisers");
