import { useState } from "react"
import { LoginUser, RegisterUser } from "../api/authApi";
import { useAuthStore } from "../store/userStore";


export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { setUser } = useAuthStore();

    const handleAuthSuccess = (response: any) => {
        if (response?.token && response?.user?.id) {
            setUser({ id: response.user.id }, response.token);
            return true;
        }
        return false;
    };

    const Login = async (email: string, password: string) => {
        setError("");
        setLoading(true);
        try {
            const response = await LoginUser(email, password);
            return handleAuthSuccess(response);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err.message;
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const Register = async (email: string, password: string, name?: string) => {
        setError("");
        setLoading(true);
        try {
            const response = await RegisterUser(email, password, name);
            return handleAuthSuccess(response);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, setError, Login, Register };
};