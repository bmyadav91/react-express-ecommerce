import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../../../types/cart";

type CartState = {
    cart: Record<string, CartItem>;
    addToCart: (id: string) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: {},

            addToCart: (id) =>
                set((state) => ({
                    cart: {
                        ...state.cart,
                        [id]: {
                            productId: id,
                            quantity: (state.cart[id]?.quantity || 0) + 1,
                        },
                    },
                })),

            increaseQty: (id) =>
                set((state) => {
                    const current = state.cart[id];
                    if (!current) return state;

                    return {
                        cart: {
                            ...state.cart,
                            [id]: {
                                productId: id,
                                quantity: current.quantity + 1,
                            },
                        },
                    };
                }),

            decreaseQty: (id) =>
                set((state) => {
                    const current = state.cart[id];
                    if (!current) return state;

                    if (current.quantity === 1) {
                        const { [id]: _, ...rest } = state.cart;
                        return { cart: rest };
                    }

                    return {
                        cart: {
                            ...state.cart,
                            [id]: {
                                productId: id,
                                quantity: current.quantity - 1,
                            },
                        },
                    };
                }),

            clearCart: () => set({ cart: {} }),
        }),
        {
            name: "cart-storage",
        }
    )
);