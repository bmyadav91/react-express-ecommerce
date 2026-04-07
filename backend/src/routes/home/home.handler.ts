import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/asyncHandler";
import { getHomeRecommendedProductsService } from "../../services/home/home.service";

export const homeProducts = AsyncHandler(async (req: Request, res: Response) => {
    console.log("Home API hit!");
    // Force query to be a string or undefined
    const query = typeof req.query.query === 'string' 
        ? req.query.query 
        : (req.query.q as string);

    // Parse numbers for pagination (req.query is always strings)
    const skip = req.query.last_id || req.query.skip 
        ? parseInt((req.query.last_id || req.query.skip) as string) 
        : 0;

    const limit = req.query.limit 
        ? parseInt(req.query.limit as string) 
        : 10;

    // Call service with clean types
    const result = await getHomeRecommendedProductsService(
        query,
        skip,
        limit
    );

    res.json(result);
});