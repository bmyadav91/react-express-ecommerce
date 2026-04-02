import styles from "../styles/Skeleton.module.css"

interface Props {
    width?: number | string,
    height?: number | string,
    count?: number,
    gap?: number,
    direction?: "horizontal" | "vertical",
    style?: React.CSSProperties,  // Parent style 
}

export const SkeletonUI = ({
    width = "100%",
    height = 150,
    count = 1,
    gap = 20,
    direction = "vertical",
    style
}: Props) => {


    const items = Array.from({ length: count })
    const flexDirection = direction === "vertical" ? "column" : "row";
    const computedWidth =
        width ??
        (direction === "horizontal"
            ? `calc((100% - ${(count - 1) * gap}px) / ${count})`
            : "100%");

    return (
        <div
            className={styles.SkeletonParent}
            style={{
                flexDirection,
                gap: `${gap}px`,
                ...style
            }}
        >
            {items.map((_, i) => (
                <div
                    key={i}
                    className={styles.Skeleton}
                    style={{
                        width: computedWidth,
                        height,
                    }}
                />

            ))}
        </div>
    )
}