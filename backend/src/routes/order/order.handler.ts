import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";

import { createOrderService, getOrderDetailService, getOrderListForUserService } from "../../services/order/order.service";



export const createOrder = AsyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user;
    if (!userId) throw new AppError("Unauthorized access", 401);

    const { cart } = req.body;
    const result = await createOrderService(userId, cart);

    res.status(201).json(result);
});

export const getOrderDetail = AsyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const { order_id } = req.params;

    if (typeof order_id !== 'string') {
        throw new AppError("Invalid Order ID format", 400);
    }

    const order = await getOrderDetailService(order_id, userId);
    res.json(order);
});

export const getOrderList = AsyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user;

    // FIX: Use req.query instead of req.params for pagination
    const last_id = req.query.last_id as string || null;
    const asc = req.query.asc === "true";
    // If you want to allow custom limits:
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const orderList = await getOrderListForUserService(
        userId,
        last_id,
        limit,
        asc
    );

    res.json(orderList);
});