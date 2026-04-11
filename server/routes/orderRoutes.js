import express from "express";
import { createOrder, getOrders, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.delete("/orders/:id", deleteOrder);

export default router;
