import mongoose, { Document, Schema } from "mongoose";

const paintingSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
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

export type IPainting = Document & {
  _id: string;
  name: string;
  artist: string;
  category: string;
  description: string;
  price: number;
  image: string;
  isNewPiece: boolean;
  onSale: boolean;
};

const Painting =
  mongoose.models.Painting ||
  mongoose.model<IPainting>("Painting", paintingSchema);

export default Painting;
