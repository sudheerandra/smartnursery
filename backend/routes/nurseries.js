import express from "express";
import { addPlant, getPlants } from "../controllers/nurseryController.js";

const router = express.Router();

router.post("/", addPlant);
router.get("/", getPlants);

export default router;
