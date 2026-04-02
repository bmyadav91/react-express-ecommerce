import { useState, useEffect } from "react";
import type { Product } from "../../../types/product";
import { getCartProducts } from "../api/getCartProducts";

export const useGetCartProducts = (ids: string[]) => {
    console.log("useGetCartProdcuts called")

    const [data, setData] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const res = await getCartProducts(ids);
            if (res) {
                setData(res)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err?.message)
            } else {
                setError("Unexpected error")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setError("");

        if (!ids || ids.length === 0) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetchData();
    }, [ids]);

    return { data, loading, error };
}