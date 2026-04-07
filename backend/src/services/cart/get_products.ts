import { AppError } from "../../utils/AppError";
import { apiRequest } from "../../utils/api.client";

export const getProductsDetails = async (ids: string[]) => {
    if (!ids || ids.length === 0) throw new AppError("Atleast a product id is required", 403);

    try {
        const response = await Promise.all(
            ids.map((id) => (
                apiRequest(`https://dummyjson.com/products/${id}`, {
                    method: "GET",
                    headers: { "Conetent-Type": "application/json" }
                }, 20000)
            ))
        )

        return response;
    } catch (error) {
        throw error
    }
}