import React from "react";


interface Props {
    title: string,
    icon?: React.ReactNode,
    data?: Record<string, string>,
    style?: React.CSSProperties,
}

export const SummaryUI = ({
    title,
    icon,
    data,
    style
}: Props) => {

    const hasData = data && Object.keys(data).length > 0;

    return (
        // parent 
        <div
            style={{
                border: ".5px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
                ...style
            }}
        >
            {/* header  */}
            <div
                style={{
                    display: "flex",
                    gap: "5px 10px",
                    alignItems: "center",
                    background: "#fffafa",
                    padding: "5px",
                    borderBottom: ".5px solid #ccc"
                }}
            >
                {icon && (
                    <div
                        style={{
                            background: "#ccc",
                            padding: "5px 10px",
                            borderRadius: "10px",
                        }}
                    >
                        {icon}
                    </div>
                )}
                <strong style={{ fontSize: "1rem", letterSpacing: ".5px", color: "#333" }}>{title}</strong>
            </div>

            {/* body  */}
            {hasData && (
                <dl
                    style={{
                        padding: "10px",
                    }}
                >
                    {Object.entries(data).map(([key, value]) => (
                        <div
                            key={key}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                            }}
                        >
                            <dt
                                style={{
                                    margin: "0",
                                    fontWeight: "500",
                                    color: "#444",
                                    letterSpacing: ".5px"
                                }}
                            >
                                {key}
                            </dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>

            )}
        </div>
    )
}