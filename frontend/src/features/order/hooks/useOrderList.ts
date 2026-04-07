import { useEffect, useState } from "react";

import type { OrderType } from "../../../types/orderType";

import { getOrderList } from "../api/order.api";


export const useOrderList = () => {
    const [loading, setLoading] = useState<boolean>(true); // intial loading
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<OrderType[]>([]);
    const [hasNext, setHasNext] = useState<boolean>(true);
    const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
    const [lastId, setLastId] = useState<string | number | null>(null);

    const fetchData = async () => {

        if (paginationLoading || !hasNext) {
            if (loading) setLoading(false);
            return;
        };

        setPaginationLoading(true);
        setError("");

        try {
            const response = await getOrderList(lastId, 10, false);

            if (response?.data) {
                setData((prev) => [...prev, ...response.data]);

                const nextCursor = response.pagination?.next_cursor || response.pagination?.last_id;
                setLastId(nextCursor || null);
            }

            setHasNext(!!response?.pagination?.has_more);

        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message);
            setHasNext(false);
        } finally {
            setPaginationLoading(false);
            if (loading) setLoading(false);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchData();
    }, []);

    return { loading, data, error, hasNext, fetchData, paginationLoading };
};