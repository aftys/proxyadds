import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignBusinessActivity extends Document {
  business_activity_id: number;
  campaign_id: number;
  deleted: boolean;
}

const CampaignBusinessActivitySchema: Schema = new Schema(
  {
    business_activity_id: { type: Schema.Types.ObjectId, ref: 'BusinessActivity', length: 11},
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignBusinessActivity>(
  "CampaignBusinessActivity",
  CampaignBusinessActivitySchema,
  "campaign_business_activities"
);
