import mongoose, { Document, Schema } from "mongoose";

export interface IQuote extends Document {
  rfq: mongoose.Types.ObjectId;
  supplier: mongoose.Types.ObjectId;
  price: number;
  deliveryTime: string;
  message: string;
}

const quoteSchema = new Schema<IQuote>(
  {
    rfq: {
      type: Schema.Types.ObjectId,
      ref: "RFQ",
      required: true,
    },

    supplier: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryTime: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model<IQuote>("Quote", quoteSchema);

export default Quote;
