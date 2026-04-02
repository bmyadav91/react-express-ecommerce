import React from "react";

export const FullscreenLoader = () => {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <style>
                {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
            </style>

            <div style={{ display: "flex", gap: 6 }}>
                <div style={dot(0)} />
                <div style={dot(0.2)} />
                <div style={dot(0.4)} />
            </div>
        </div>
    );
};

const dot = (delay: number): React.CSSProperties => ({
    width: 12,
    height: 12,
    backgroundColor: "#333",
    animation: "bounce 1.2s infinite ease-in-out",
    animationDelay: `${delay}s`,
});