import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IRFQ extends Document {
  buyer: mongoose.Types.ObjectId;
  productService: string;
  description: string;
  quantity: number;
  unit: "Units" | "Pcs" | "Bays" | "Kg";
  deliveryLocation: string;
  deadline: Date;
  images: string[];
  status: "open" | "closed";
}

const rfqSchema = new Schema<IRFQ>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productService: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      required: true,
      enum: [
        "Units",
        "Pcs",
        "Bays",
        "Kg",
      ],
    },

    deliveryLocation: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const RFQ = mongoose.model<IRFQ>(
  "RFQ",
  rfqSchema
);

export default RFQ;