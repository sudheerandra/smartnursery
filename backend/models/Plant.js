import mongoose from "mongoose";

const PlantSchema = new mongoose.Schema({
  nurseryOwnerName: { type: String, required: true },   // <-- NEW FIELD
  nurseryOwnerNumber: { type: String, required: true },
  plantName: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: String }],                            // supports custom sizes
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("PlantsData", PlantSchema);
