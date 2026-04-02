import styles from "../styles/RadioSelection.module.css"

import type { RadioField } from "../../types/formField";

interface Props {
    data: RadioField[];
    selected?: string;
    style?: React.CSSProperties;
    onChange?: (value: string) => void;
}

export const RadioSelectionUI = ({
    data,
    selected,
    onChange,
    style,
}: Props) => {

    return (
        <div className={styles.RadioSelectionContainer} style={{...style}}>
            {data.map((item) => (
                <label key={item.name} className={styles.radioField}>
                    <input
                        type="radio"
                        name="radio-group"
                        value={item.name}
                        checked={selected == item.name}
                        onChange={() => onChange?.(item.name)}
                    />
                    {item.label}
                </label>
            ))}
        </div>
    )
}