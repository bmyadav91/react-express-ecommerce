import { useState, useEffect } from "react";
import { getProductDetail } from "../api/product";

import type { ProductDetail } from "../../../types/product";

export const useProductDetail = (productId: number | string) => {
    console.log("useProductDetail hit")
    const [data, setData] = useState<ProductDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        try {
            const res = await getProductDetail(productId);
            setData(res);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err?.message || "something went wrong");
            } else {
                setError("Something unexpected gone.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        setError("");
        fetchData();
    }, [productId])

    return { data, loading, error };
}