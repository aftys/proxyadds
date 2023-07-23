import mongoose, { Document, Schema } from "mongoose";

export interface ILocation extends Document {
  region: string;
  city: string;
  secteur: string;
  longitude: number;
  altitude: number;
}

const LocationSchema: Schema = new Schema(
  {
    region: { type: String, required: true },
    city: { type: String, required: true },
    secteur: { type: String, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILocation>("Location", LocationSchema, "locations");
