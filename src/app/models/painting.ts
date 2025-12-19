import mongoose, { model, Schema, Types } from "mongoose";

export interface IPainting {
  _id: Types.ObjectId;
  name: string;
  artist: string;
  category: string;
  description: string;
  price: number;
  image: string;
  isNewPiece: boolean;
  onSale: boolean;
}

const paintingSchema = new Schema<IPainting>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isNewPiece: {
      type: Boolean,
      default: true,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Painting =
  mongoose.models.Painting || model<IPainting>("Painting", paintingSchema);
