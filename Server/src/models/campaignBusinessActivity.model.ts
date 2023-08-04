import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignBusinessActivity extends Document {
  businessActivity_ids: number;
  campaign_id: number;
  deleted: boolean;
}

const CampaignBusinessActivitySchema: Schema = new Schema(
  {
    businessActivity_id: { type: Schema.Types.ObjectId, ref: 'BusinessActivity', required: true },
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignBusinessActivity>(
  "CampaignBusinessActivity",
  CampaignBusinessActivitySchema,
  "campaign_businessactivities"
);
