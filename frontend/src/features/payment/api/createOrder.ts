import { api } from "../../../services/api/axios";
import type { Cart } from "../../../types/cart";

export const createOrder = async (payment_method: string, cart: Cart) => {
    const response = await api.post("/orders", {
        payment_method,
        cart
    });
    return response?.data;
}