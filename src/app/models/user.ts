import mongoose, { model, Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  role: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model<IUser>("User", userSchema);
