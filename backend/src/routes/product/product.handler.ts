import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { getProductDetailsService, getProductsByCategoryService } from "../../services/product/product.service";

export const getProducts = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== "string") throw new AppError("Product id is required", 403);

    const result = await getProductDetailsService(
        id
    );

    res.json(result);
});

export const getProductByCategory = AsyncHandler(async (req: Request, res: Response) => {
    const { category } = req.params;

    if (!category || typeof category !== "string") throw new AppError("a valid category required", 403);

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skip = req.query.last_id || req.query.skip
        ? parseInt((req.query.last_id || req.query.skip) as string)
        : 0;

    const result = await getProductsByCategoryService(
        category,
        limit,
        skip
    )

    res.json(result);

})