export type fieldType = "text" | "number" | "password" | "textarea" | "radio" | "checkbox";

export type formField = {
    name: string,
    type: fieldType,
    label?: string,
    value?: string | number | boolean;
    placeHolder?: string,
    note?: string,
    required?: boolean,
}

export type RadioField = {
    name: string;
    label: string;
};