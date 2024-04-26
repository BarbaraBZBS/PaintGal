import mongoose, { Document, Schema } from "mongoose";

const paintingSchema: Schema = new mongoose.Schema(
  {
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
      defaultValue: false,
    },
    onSale: {
      type: Boolean,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

export type IPainting = Document & {
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

//interface IPaintingDoc extends IPainting, Document {}
//interface IPaintingModel extends Model<IPaintingDoc> {}
//
//const paintingModel: IPaintingModel =
//  Mongoose.models.painting ||
//  Mongoose.model<IPaintingDoc>("painting", paintingSchema);
//
export default Painting;
