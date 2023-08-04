import mongoose, { Document, Schema } from "mongoose";
import { CampaignStatus } from "../enums/campaignStatus.enum";


export interface ICampaign extends Document {
  name: string;
  budget_max: number;
  begin_date: Date;
  end_date: Date;
  file: string;
  display_hours: string;
  status: CampaignStatus;
  url: string;
  advertiser_id: string;
  deleted:boolean,
}

const CampaignSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    budget_max: { type: Number, required: true },
    begin_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    file: { type: Schema.Types.ObjectId, ref: 'GridFSFile', required: true },
    display_hours: { type: String, required: true },
    status: { type: String, enum: CampaignStatus, required: true }, //Object.values(CampaignStatus)
    url: { type: String, required: true },
    advertiser_id: { type: String, required: true },
    deleted:{ type: Boolean, defaults: false }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaign>("Campaign", CampaignSchema, "campaigns");


//Schema.Types.ObjectId, ref: 'File'