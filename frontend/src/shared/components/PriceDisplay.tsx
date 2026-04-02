
interface Props {
    price: number,
    discountPercent?: number,
    currencySymbol?: string,
    currencyCode?: string,
    size?: number,
    style?: React.CSSProperties
}
export const PriceDisplay = ({
    price,
    discountPercent,
    currencySymbol = "₹",
    currencyCode = "INR",
    size = 16,
    style
}: Props) => {

    price = Number.isFinite(price) ? price : 0;
    const hasDiscount = Number.isFinite(discountPercent);

    const discount = hasDiscount ? discountPercent! : 0;
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    const formatNumber = (num: number) => {
        if (!Number.isFinite(num)) return "0";

        const rounded = parseFloat(num.toFixed(2));

        if (Number.isInteger(rounded)) {
            return rounded.toString();
        }

        return rounded.toString();
    };

    const formattedFinal = formatNumber(finalPrice);
    const formattedOriginal = formatNumber(price);

    return (
        <div
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
            aria-label={`Price: ${currencySymbol}${formattedFinal}`}
            style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                padding: "2px",
                ...style,
            }}
        >
            {/* SEO meta (no UI impact) */}
            <meta itemProp="price" content={formattedFinal} />
            <meta itemProp="priceCurrency" content={currencyCode} />

            {/* Visible price */}
            <span
                style={{
                    fontSize: size,
                    fontWeight: "600"
                }}
            >
                {currencySymbol}
                {formattedFinal}
            </span>

            {hasDiscount && (
                <>
                    <del
                        style={{
                            fontSize: size - 1,
                            fontWeight: "400",
                        }}
                    >
                        {currencySymbol}
                        {formattedOriginal}
                    </del>

                    <span
                        style={{
                            fontSize: size - 1,
                            fontWeight: "400",
                            color: "green"
                        }}
                    >
                        ({formatNumber(discount)}% OFF)
                    </span>
                </>
            )}
        </div>
    );
};