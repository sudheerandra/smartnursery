import express from "express";
import {
  getBuyers,
  addBuyer,
  updateBuyerPayment,
} from "../controllers/buyerController.js";

const router = express.Router();

router.get("/", getBuyers);
router.post("/", addBuyer);
router.put("/:id/pay", updateBuyerPayment);

export default router;
