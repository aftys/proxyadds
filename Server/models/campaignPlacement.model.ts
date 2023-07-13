import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignPlacement extends Document {
  campaign_id: number;
  placement_id: number;
  tracking_id: number;
}

const CampaignPlacementSchema: Schema = new Schema(
  {
    campaign_id: { type: Number, required: true },
    placement_id: { type: Number, required: true },
    tracking_id: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignPlacement>(
  "CampaignPlacement",
  CampaignPlacementSchema,
  "campaign_placements"
);
