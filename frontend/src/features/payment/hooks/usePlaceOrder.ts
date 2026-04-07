import { useState } from "react";
import type { Cart } from "../../../types/cart";
import { createOrder } from "../api/createOrder";


export const usePlaceOrder = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, SetError] = useState<string>("");

    const placeOrder = async (payment_method: string, cart: Cart) => {
        setLoading(true);
        SetError("");

        try {
            const response = await createOrder(
                payment_method,
                cart
            );

            if (response?.id) {
                return true
            }
        } catch (err : any) {
            SetError(err?.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { placeOrder, error, SetError, loading }
}