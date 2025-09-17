import express from "express";
import { addPlant, addSizeToPlant, getPlants, updateSize } from "../controllers/plantController.js";

const router = express.Router();

router.post("/", addPlant);      // Add new plant
router.get("/", getPlants);      // Get all plants
router.put("/size", updateSize); // Update size price/quantity
router.post("/size", addSizeToPlant); // add new size to existing plant

export default router;
