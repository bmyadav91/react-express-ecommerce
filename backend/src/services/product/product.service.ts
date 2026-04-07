import { AppError } from "../../utils/AppError";
import { getProductDetail, getProductsByCategory } from "./get_product";

export const getProductDetailsService = async (id: string | number) => {
    if (!id) throw new AppError("Product Id is required", 403);

    return await getProductDetail(id);
}

export const getProductsByCategoryService = async (category: string, limit: number = 10, last_id: string | number = 0) => {

    if (!category) throw new AppError("Category is required", 400)

    return await getProductsByCategory(
        category,
        limit,
        last_id
    )
}