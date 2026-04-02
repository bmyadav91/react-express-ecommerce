import { api } from "../../../services/api/axios";


export const getProductDetail = async (productId: number | string) => {
    console.log("ProductDetail getProductDetail called")
    const res = await api.get(`/products/${productId}`);
    return res.data;
};