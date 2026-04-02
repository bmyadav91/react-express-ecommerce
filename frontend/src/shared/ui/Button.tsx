import React from "react";
import styles from "../styles/Button.module.css";

interface Props {
    title: string;
    type?: "primary" | "outline";
    icon?: React.ReactNode;
    backgroundColor?: string;
    isDisabled?: boolean;
    isProcessing?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const Button: React.FC<Props> = ({
    title,
    type = "primary",
    icon,
    backgroundColor,
    isDisabled = false,
    isProcessing = false,
    onClick,
    className = "",
    style
}) => {
    const isButtonDisabled = isDisabled || isProcessing;

    return (
        <button
            type="button"
            disabled={isButtonDisabled}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isButtonDisabled && onClick) {
                    onClick();
                }
            }}
            className={`
                ${styles.base}
                ${type === "primary" ? styles.primary : styles.outline}
                ${isButtonDisabled ? styles.disabled : ""}
                ${className}
            `}
            style={{
                ...(backgroundColor && type === "primary"
                    ? { backgroundColor }
                    : {}),
                ...style,
            }}
        >
            {icon && <span className={styles.icon}>{icon}</span>}

            {title && (
                <span>{isProcessing ? "Processing..." : title}</span>
            )}
        </button>
    );
};