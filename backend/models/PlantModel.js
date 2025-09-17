import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sizes: [sizeSchema],
  },
  { timestamps: true }
);

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;
