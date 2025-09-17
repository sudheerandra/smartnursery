import Buyer from "../models/buyerModel.js";
import Plant from "../models/PlantModel.js";

// GET all buyers
export const getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find().sort({ createdAt: -1 });
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD buyer + reduce stock
export const addBuyer = async (req, res) => {
  try {
    const buyer = new Buyer(req.body);

    // reduce stock for each ordered plant
    for (const p of buyer.plants) {
      const plant = await Plant.findById(p.plantId);
      if (plant) {
        const sizeData = plant.sizes.find((s) => s.size === p.size);
        if (!sizeData) {
          return res.status(400).json({
            success: false,
            message: `Size ${p.size} not found for ${plant.name}`,
          });
        }

        if (sizeData.quantity < p.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for ${plant.name} (${p.size})`,
          });
        }

        sizeData.quantity -= p.quantity;
        await plant.save();
      }
    }

    await buyer.save();
    res.status(201).json({ success: true, data: buyer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE buyer payment
export const updateBuyerPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer)
      return res.status(404).json({ success: false, message: "Buyer not found" });

    buyer.paid = amount;
    await buyer.save();
    res.json({ success: true, data: buyer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
