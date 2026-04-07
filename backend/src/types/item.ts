
export type itemType = {
    id: string;
    title: string;
    originalPrice: number;
    price: number; // This will be the price AFTER discount
    discount: number;
}

export type DummyProduct = {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
}