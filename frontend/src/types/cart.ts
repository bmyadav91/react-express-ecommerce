export type CartItem = {
    productId: string;
    quantity: number;
};

export type Cart = Record<string, CartItem>;