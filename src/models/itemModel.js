import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pricePerDay: {
      type: Number,
    },
    availability: {
      type: Boolean,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model("Item", itemSchema);

export default ItemModel;
