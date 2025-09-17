import Plant from "../models/PlantModel.js";

// @desc Add new plant
export const addPlant = async (req, res) => { 
  try {
    const { name, sizes } = req.body;

    const plant = new Plant({ name, sizes });
    await plant.save();

    res.status(201).json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Get all plants
export const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update size (price/quantity)
export const updateSize = async (req, res) => {
  try {
    const { plantId, size, price, quantity } = req.body;

    const plant = await Plant.findById(plantId);
    if (!plant) return res.status(404).json({ message: "Plant not found" });

    const sizeObj = plant.sizes.find((s) => s.size === size);
    if (!sizeObj) return res.status(404).json({ message: "Size not found" });

    sizeObj.price = price;
    sizeObj.quantity = quantity;

    await plant.save();
    res.json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//add size to existing plant
export const addSizeToPlant = async (req, res) => {
  try {
    const { plantId, size, price, quantity } = req.body;

    const plant = await Plant.findById(plantId);
    if (!plant) return res.status(404).json({ message: "Plant not found" });

    // prevent duplicate size
    if (plant.sizes.some((s) => s.size === size)) {
      return res.status(400).json({ message: "Size already exists for this plant" });
    }

    plant.sizes.push({ size, price, quantity });
    await plant.save();

    res.json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
