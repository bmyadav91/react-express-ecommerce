import { api } from "../../../services/api/axios";

export const getSimilarProductsByCategory = async (category: string, limit: number = 11) => {
    console.log("getSimilarProductsByCategory hit")
    const res = await api.get("products/category/" + category, {
        params: {
            limit
        }
    });
    return res?.data?.products;
}