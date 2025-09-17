import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    plants: [
      {
        plantId: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
        plant: String,
        size: String,
        quantity: Number,
        total: Number,
      },
    ],
    total: { type: Number, required: true },
    paid: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Buyer", BuyerSchema);
