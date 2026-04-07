import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";

import { createOrder, getOrderDetail, getOrderList } from "./order.handler"

export const orderRouter = Router();

orderRouter.post("/", protect, createOrder)
orderRouter.get("/", protect, getOrderList)
orderRouter.get("/:id", protect, getOrderDetail)