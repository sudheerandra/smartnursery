import Plant from "../models/Plant.js";

// Create
export const addPlant = async (req, res) => {
  try {
    const {
      nurseryOwnerName,
      nurseryOwnerNumber,
      plantName,
      price,
      sizes
    } = req.body;

    if (!nurseryOwnerName || !nurseryOwnerNumber || !plantName || price == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const plant = new Plant({
      nurseryOwnerName,
      nurseryOwnerNumber,
      plantName,
      price,
      sizes: Array.isArray(sizes) ? sizes : []
    });

    await plant.save();
    res.status(201).json(plant);

  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all
export const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
