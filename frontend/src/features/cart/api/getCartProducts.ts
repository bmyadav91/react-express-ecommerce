import { api } from "../../../services/api/axios";

export const getCartProducts = async (ids: string[]) => {
    if (!ids || ids.length === 0) return [];

    const res = await Promise.all(
        ids.map((id) => api.get(`/products/${id}`))
    );

    return res.map(r => r.data);
};