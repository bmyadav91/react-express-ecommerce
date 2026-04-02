import { useState, useEffect } from "react";
import type { Product } from "../../../types/product";
import { getSimilarProductsByCategory } from "../api/similarProducts";

export const useSimilarProductsByCategory = (category: string, limit: number = 11) => {
    console.log("useSimilarProductsByCategory called")
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>("");
    const [data, setData] = useState<Product[]>([])

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await getSimilarProductsByCategory(category, limit);
            if (res) {
                setData(res)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err?.message || "Something went wrong")
            } else {
                setError("Unexpected error")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!category) return;
        fetchData()
    }, [category])

    return { data, loading, error };
}