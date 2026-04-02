import React from 'react';

type Props = {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    underlineWidth?: string; // "60%" | "100px"
    underlineColor?: string;
};

export const SectionTitle = ({
    children,
    size = 'md',
    underlineWidth = '80%',
    underlineColor = 'rgb(67, 47, 255)',
}: Props) => {
    const fontSizeMap = {
        sm: '1rem',
        md: '1.25rem',
        lg: '1.75rem',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', position: 'relative' }}>
                <h2
                    style={{
                        fontSize: fontSizeMap[size],
                        margin: 0,
                    }}
                >
                    {children}
                </h2>

                {/* underline */}
                <span
                    style={{
                        display: 'block',
                        height: '2px',
                        width: underlineWidth,
                        background: underlineColor,
                        margin: '6px auto 0',
                    }}
                />
            </div>
        </div>
    );
};