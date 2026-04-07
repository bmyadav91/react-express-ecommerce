import { apiRequest } from "../../utils/api.client";
import { itemType, DummyProduct } from "../../types/item";

export const getItems = async (ids: string[]): Promise<itemType[]> => {
    if (ids.length === 0) return [];

    try {
        const response = await Promise.all(
            ids.map((id) =>
                apiRequest<DummyProduct>(`https://dummyjson.com/products/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }, 20000)
            )
        );

        return response.map((product): itemType => {
            const price = product.price || 0;
            const discountPercent = product.discountPercentage || 0;

            const discountAmount = price * (discountPercent / 100);
            const finalPrice = price - discountAmount;

            return {
                id: product.id.toString(),
                title: product.title,
                originalPrice: price, // 👈 Added this to match your type
                price: parseFloat(finalPrice.toFixed(2)),
                discount: parseFloat(discountAmount.toFixed(2))
            };
        });

    } catch (error) {
        console.error("Failed to fetch one or more items:", error);
        throw error;
    }
};