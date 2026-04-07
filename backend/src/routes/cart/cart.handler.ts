import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { getCartProductsService } from "../../services/cart/cart.service";

export const getCartProducts = AsyncHandler(async (req: Request, res: Response) => {
    const { ids } = req.params;

    if (!ids || typeof ids !== "string") {
        throw new AppError("Product IDs are required", 400);
    }

    const idList = ids.split(",").map(id => id.trim());

    const result = await getCartProductsService(idList);

    res.json(result);
});