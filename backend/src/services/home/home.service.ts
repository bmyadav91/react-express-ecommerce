import { getProducts } from "./get_item.home";

export const getHomeRecommendedProductsService = async (query: string, last_id: number = 0, limit: number = 10) => {
    return getProducts(
        query,
        last_id,
        limit
    )
}