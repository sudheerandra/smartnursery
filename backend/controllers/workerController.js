import Worker from "../models/workerModel.js";

// GET workers
export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json({ success: true, data: workers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD worker
export const addWorker = async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json({ success: true, data: worker });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE worker payment
export const updateWorkerPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const worker = await Worker.findById(req.params.id);
    if (!worker)
      return res.status(404).json({ success: false, message: "Worker not found" });

    worker.paid = amount;
    await worker.save();
    res.json({ success: true, data: worker });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
