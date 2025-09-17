import express from "express";
import {
  getWorkers,
  addWorker,
  updateWorkerPayment,
} from "../controllers/workerController.js";

const router = express.Router();

router.get("/", getWorkers);
router.post("/", addWorker);
router.put("/:id/payment", updateWorkerPayment);

export default router;
