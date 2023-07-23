import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignPlacement extends Document {
  campaign_id: number;
  placement_id: number;
  tracking_id: number;
  deleted: boolean;

}

const CampaignPlacementSchema: Schema = new Schema(
  {
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    placement_id: {type: Schema.Types.ObjectId, ref: 'Placement', required: true },
    tracking_id: { type: Number, required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignPlacement>(
  "CampaignPlacement",
  CampaignPlacementSchema,
  "campaign_placements"
);
