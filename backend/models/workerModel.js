import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true }, // e.g. Gardener, Helper
    salary: { type: Number, required: true }, // agreed salary
    paid: { type: Number, default: 0 }, // amount paid
    month: {
      type: String,
      default: () =>
        new Date().toLocaleString("default", { month: "long" }), // auto current month
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite issue during hot-reload (use mongoose.models)
const Worker =
  mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);

export default Worker;
