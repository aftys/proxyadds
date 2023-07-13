import mongoose, { Document, Schema } from "mongoose";

export interface ICampaignBusinessType extends Document {
  businesstype_id: number;
  campaign_id: number;
  campaign_name: string;
  type_name: string;
}

const CampaignBusinessTypeSchema: Schema = new Schema(
  {
    businesstype_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    campaign_name: { type: String, required: true },
    type_name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICampaignBusinessType>(
  "CampaignBusinessType",
  CampaignBusinessTypeSchema,
  "campaign_businesstypes"
);
