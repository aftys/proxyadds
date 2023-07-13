import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignLocation extends Document {
  campaign_id: number;
  location_id: number;
  radius: number;
}

const CampaignLocationSchema: Schema = new Schema(
  {
    campaign_id: { type: Number, required: true },
    location_id: { type: Number, required: true },
    radius: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignLocation>(
  "CampaignLocation",
  CampaignLocationSchema,
  "campaign_locations"
);
