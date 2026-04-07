
export const formateDate = (dateInpute: string | number | Date | undefined | null): string => {
    if (!dateInpute) return "NA"

    const date = new Date(dateInpute);

    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};