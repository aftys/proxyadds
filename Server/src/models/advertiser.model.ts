import mongoose, { Document, Schema } from "mongoose";

export interface IAdvertiser extends Document {
  user_id: number;
  act_id: number;
  deleted:boolean;
}

const AdvertiserSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    act_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<IAdvertiser>("Advertiser", AdvertiserSchema, "advertisers");
