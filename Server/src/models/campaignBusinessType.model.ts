import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignBusinessType extends Document {
  business_type_id: number;
  campaign_id: number;
  deleted:boolean;
}

const CampaignBusinessTypeSchema: Schema = new Schema(
  {
    business_type_id: { type: Schema.Types.ObjectId, ref: 'BusinessType', required: true },
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignBusinessType>(
  "CampaignBusinessType",
  CampaignBusinessTypeSchema,
  "campaign_business_types"
);
