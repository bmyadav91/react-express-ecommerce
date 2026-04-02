

export function formatPriceWithCurrency(
    price: number | string | undefined,
    symbol: string = "₹"
): string {
    const num = Number(price);

    if (!Number.isFinite(num)) {
        return `${symbol}0.00`;
    }

    return Number.isInteger(num)
        ? `${symbol}${num}`
        : `${symbol}${num.toFixed(2)}`;
}