import { api } from "../../../services/api/axios";

export const LoginUser = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Email and Password both are required.");

    const response = await api.post("/auth/login", {
        email: email,
        password: password
    });

    return response?.data;
}


export const RegisterUser = async (email: string, password: string, name?: string) => {
    if (!email || !password) throw new Error("Email and password are required");

    const response = await api.post("/auth/register", {
        email: email,
        password: password,
        name: name
    });

    return response?.data;
}