import React from "react"

interface Props {
    rating: number,
    max?: number,
    showValue?: boolean,
    size?: number,
    color?: string,
    style?: React.CSSProperties;
}

export const RatingDisplay = ({
    rating,
    max = 5,
    showValue = true,
    size = 16,
    color = "#f5a623",
    style,
}: Props) => {
    const safestRating = Math.max(0, Math.min(rating, max));
    const stars = [];

    for (let i = 1; i <= max; i++) {
        if (safestRating >= i) {
            stars.push("star-fill");
        } else if (safestRating >= i - 0.5) {
            stars.push("star-half");
        } else {
            stars.push("star");
        }
    }

    const ratingValue = parseFloat(safestRating.toFixed(1));

    return (
        <div
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
            aria-label={`Rating: ${ratingValue} out of ${max}`}
            style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
                ...style,
            }}
        >
            {/* Hidden SEO values (important) */}
            <meta itemProp="ratingValue" content={ratingValue.toString()} />
            <meta itemProp="bestRating" content={max.toString()} />
            <meta itemProp="worstRating" content="0" />

            {/* Visual stars (unchanged UI) */}
            {stars.map((type, index) => (
                <i
                    key={index}
                    className={`bi bi-${type}`}
                    style={{ fontSize: size, color: color }}
                    aria-hidden="true"
                />
            ))}

            {/* Visible rating */}
            {showValue && (
                <span style={{ fontSize: size }}>
                    ({ratingValue}/{max})
                </span>
            )}
        </div>
    );
};