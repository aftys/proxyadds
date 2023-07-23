import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignLocation extends Document {
  campaign_id: number;
  location_id: number;
  radius: number;
  deleted:boolean;
}

const CampaignLocationSchema: Schema = new Schema(
  {
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    location_id: { type: Schema.Types.ObjectId, ref: 'BusinessActivity', required: true },
    radius: { type: Number, required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignLocation>(
  "CampaignLocation",
  CampaignLocationSchema,
  "campaign_locations"
);
