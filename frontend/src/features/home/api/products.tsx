import { api } from "../../../services/api/axios";
import type { Product } from "../../../types/product";

interface GetProductsParams {
    limit?: number;
    skip?: number;
    q?: string;
}

export const getProducts = async ({
    limit = 10,
    skip = 0,
    q,
}: GetProductsParams = {}): Promise<{
    products: Product[];
    total: number;
}> => {
    console.log("Home getProducts called")
    const url = q ? "/products/search" : "/products";

    const response = await api.get(url, {
        params: {
            limit,
            skip,
            q,
        },
    });

    return {
        products: response.data.products,
        total: response.data.total,
    };
};