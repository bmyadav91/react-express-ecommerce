import { apiRequest } from "../../utils/api.client";

export const getProducts = async (query?: string, skip: number = 0, limit: number = 20) => {
    // Determine the Base URL
    const baseUrl = query
        ? "https://dummyjson.com/products/search"
        : "https://dummyjson.com/products";

    // Build the Query Parameters
    const params = new URLSearchParams();

    if (query) params.append("q", query);
    params.append("limit", limit.toString());
    params.append("skip", skip.toString());

    // Combine URL and Params
    const finalUrl = `${baseUrl}?${params.toString()}`;

    try {
        const response = await apiRequest(finalUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }, 10000);

        return response;
    } catch (error: any) {
        console.error("Fetch products failed:", error.message);
        throw error;
    }
};