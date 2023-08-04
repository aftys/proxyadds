import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignLocation extends Document {
  campaign_id: number;
  location_id: number;
  deleted:boolean;
}

const CampaignLocationSchema: Schema = new Schema(
  {
    location_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignLocation>(
  "CampaignLocation",
  CampaignLocationSchema,
  "campaign_locations"
);
