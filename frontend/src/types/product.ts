
export type Product = {
    id?: number | string,
    title?: string,
    thumbnail?: string,
    images?: string[],
    price?: number,
    discountPercentage?: number,
    rating?: number;
}

export type ProductDetail = {
    id?: number | string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;

    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
    };

    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;

    reviews?: {
        rating?: number;
        comment?: string;
        date?: string; // ISO string
        reviewerName?: string;
        reviewerEmail?: string;
    }[];

    returnPolicy?: string;
    minimumOrderQuantity?: number;

    meta?: {
        createdAt?: string; // ISO string
        updatedAt?: string; // ISO string
        barcode?: string;
        qrCode?: string;
    };

    images?: string[];
    thumbnail?: string;
};