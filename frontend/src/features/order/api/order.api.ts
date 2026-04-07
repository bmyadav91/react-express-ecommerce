import { api } from "../../../services/api/axios";

export const getOrderList = async (last_id: string | number | null, limit: number = 10, asc: boolean = false) => {
    const response = await api.get("/orders", {
        params: {
            last_id,
            limit,
            asc
        }
    });

    return response?.data;
}
