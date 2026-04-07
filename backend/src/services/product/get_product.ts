import { apiRequest } from "../../utils/api.client";
import { AppError } from "../../utils/AppError";

export const getProductDetail = async (id: string | number) => {
    if (!id) throw new AppError("Product id is required", 403);

    try {
        const response = await apiRequest(`https://dummyjson.com/products/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }, 10000);

        return response;
    } catch (error) {
        throw error;
    }
}

export const getProductsByCategory = async (
    category: string,
    limit: number = 10,
    last_id: string | number = 0
) => {

    const baseUrl = `https://dummyjson.com/products/category/${category}`;

    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("skip", last_id.toString());

    const finalUrl = `${baseUrl}?${params.toString()}`;

    try {

        const response = await apiRequest(finalUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }, 10000);

        return response;
    } catch (error) {
        console.error(`Error fetching category ${category}:`, error);
        throw error;
    }
};