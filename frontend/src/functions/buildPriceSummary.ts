import type { Cart } from "../types/cart";
import type { Product } from "../types/product";


export interface PriceSummary {
    base_price: number;
    item_discount: number;
    total_discount: number;
    total_price: number;
}

export function buildPriceSummary(data: Product[], cart: Cart): PriceSummary {
    let basePrice = 0;
    let totalDiscount = 0;

    for (const product of data) {
        const id = String(product.id);
        const cartItem = cart[id];
        const qty = cartItem?.quantity ?? 0;

        const price = product.price ?? 0;
        const discountPercent = product?.discountPercentage ?? 0;

        basePrice += price * qty;
        totalDiscount += (price * discountPercent / 100) * qty;
    }

    return {
        base_price: basePrice,
        item_discount: totalDiscount,
        total_discount: totalDiscount,
        total_price: basePrice - totalDiscount,
    };
}