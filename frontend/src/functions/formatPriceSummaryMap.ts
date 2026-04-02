// types 
import type { PriceSummary } from "../types/priceSummary";

// functions 
import { formatPriceWithCurrency } from "../functions/formatPriceWithCurrency";

export function formatPriceSummaryMap(
    summary: PriceSummary,
    currency: string = "₹"
): Record<string, string> {
    return {
        "Price": formatPriceWithCurrency(summary.base_price, currency),
        "Item discount": formatPriceWithCurrency(summary.item_discount, currency),
        "Total discount": formatPriceWithCurrency(summary.total_discount, currency),
        "Total price": formatPriceWithCurrency(summary.total_price, currency),
    };
}