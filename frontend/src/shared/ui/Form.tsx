import { useState, useEffect } from "react";

import styles from "../styles/form.module.css"

// types 
import type { formField } from "../../types/formField";

// components 
import { Button } from "./Button";


interface Props {
    fields: formField[];
    initialValues?: Record<string, string | number | boolean>;
    onSubmit: (data: Record<string, string | number | boolean>) => void;
    buttonTitle?: string;
    isButtonDisabled?: boolean;
    isButtonProcessing?: boolean;
    style?: React.CSSProperties;
}

export const FormUI = ({
    fields,
    initialValues,
    onSubmit,
    buttonTitle = "Submit",
    isButtonDisabled = false,
    isButtonProcessing = false,
    style,
}: Props) => {

    const [data, setData] = useState<Record<string, string | number | boolean>>({});

    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            setData(initialValues);
            return;
        }

        // fallback to field defaults
        const initialValue: Record<string, string | number | boolean> = {};

        fields.forEach((field) => {
            if (field.value !== undefined) {
                initialValue[field.name] = field.value;
            }
        });

        setData(initialValue);

    }, [initialValues]);

    const onChangeField = (name: string, value: string | number | boolean) => {
        setData(prev => ({ ...prev, [name]: value }));
    };

    const isEmpty = (val: unknown) => {
        if (val === undefined || val === null) return true;
        if (typeof val === "string") return val.trim() === "";
        return false;
    };

    const onFinalSubmit = () => {

        for (const field of fields) {
            if (field.required && isEmpty(data[field.name])) {
                alert(`${field.name} is required`);
                return;
            }
        }

        onSubmit(data);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault(); // stop submit on enter hit 
            }}
            className={styles.formContainer}
            style={{ ...style }}
        >
            {fields.map((field) => {
                const value = data[field.name] ?? "";

                return (
                    <div key={field.name} className={styles.field}>
                        {/* Label */}
                        <label className={styles.label}>
                            {field?.label ?? field?.name}
                            {field.required && " *"}
                        </label>

                        {/* Field */}
                        {field.type === "text" && (
                            <input
                                type={field.type}
                                name={field.name}
                                value={String(value)}
                                placeholder={field.placeHolder}
                                onChange={(e) =>
                                    onChangeField(field.name, e.target.value)
                                }
                            />
                        )}

                        {field.type === "password" && (
                            <input
                                type={field.type}
                                name={field.name}
                                value={String(value)}
                                placeholder={field.placeHolder}
                                onChange={(e) =>
                                    onChangeField(field.name, e.target.value)
                                }
                            />
                        )}

                        {field.type === "number" && (
                            <input
                                type={field.type}
                                name={field.name}
                                value={value === "" ? "" : Number(value)}
                                placeholder={field.placeHolder}
                                onChange={(e) =>
                                    onChangeField(field.name, e.target.valueAsNumber)
                                }
                            />
                        )}

                        {field.type === "textarea" && (
                            <textarea
                                name={field.name}
                                value={String(value)}
                                placeholder={field.placeHolder}
                                onChange={(e) =>
                                    onChangeField(field.name, e.target.value)
                                }
                            />
                        )}

                        {field.type === "checkbox" && (
                            <input
                                name={field.name}
                                checked={Boolean(value)}
                                onChange={(e) =>
                                    onChangeField(field.name, e.target.checked)
                                }
                            />
                        )}

                        {field.type === "radio" && (
                            <input
                                name={field.name}
                                checked={Boolean(value)}
                                onChange={(e) =>
                                    onChangeField(field.name, e.target.checked)
                                }
                            />
                        )}

                        {/* Note */}
                        {field.note && (
                            <small style={{ display: "block" }} className={styles.note}>
                                {field.note}
                            </small>
                        )}
                    </div>
                );
            })}

            <Button
                title={buttonTitle}
                isDisabled={isButtonDisabled}
                isProcessing={isButtonProcessing}
                onClick={() => onFinalSubmit()}
            />
        </form>
    );
};