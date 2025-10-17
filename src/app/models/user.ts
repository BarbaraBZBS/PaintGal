import mongoose, { Document, Schema, ObjectId } from "mongoose";

const userSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
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

export type IUser = Document & {
  _id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  role: string;
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
