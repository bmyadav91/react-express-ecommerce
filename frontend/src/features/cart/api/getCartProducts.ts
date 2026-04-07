import { api } from "../../../services/api/axios";

export const getCartProducts = async (ids: string[]) => {
    if (!ids || ids.length === 0) return [];

    const res = await api.get(`/carts/${ids.join(",")}`)

    return res.data;
};