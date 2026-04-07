import { getProductsDetails } from "./get_products";
import { AppError } from "../../utils/AppError";


export const getCartProductsService = async (ids: string[]) => {
    if (!ids || ids.length === 0) throw new AppError("At least a product id is required", 403);

    return await getProductsDetails(ids);
}