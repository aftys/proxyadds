import mongoose, { Document, Schema } from "mongoose";
import { UserStatus } from "../enums/userStatus.enum";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  status: UserStatus;
  deleted:boolean;
  role:string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: UserStatus, required: true },
    deleted:{ type: Boolean, defaults: false },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema, "users");
