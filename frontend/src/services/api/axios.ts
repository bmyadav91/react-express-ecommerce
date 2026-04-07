import axios from "axios";
import { constantLinks } from "../../constants/link";
import { useAuthStore } from "../../features/auth/store/userStore";

export const api = axios.create({
    baseURL: constantLinks?.BASE_API_URL,
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json"
    },
});

// 1. Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Global Errors (like 401)
api.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx triggers this
        return response;
    },
    (error) => {
        // Any status codes outside the range of 2xx trigger this
        
        // If the server returns 401 (Unauthorized), the token is likely expired or invalid
        if (error.response && error.response.status === 401) {
            console.warn("Session expired. Logging out...");
            
            // Access the Zustand store to clear the user and token
            useAuthStore.getState().removeUser();
            
            // Optional: Redirect to login if you aren't using a ProtectedRoute wrapper
            // window.location.href = "/login";
        }

        // Return the error so the calling component's catch block can still run
        return Promise.reject(error);
    }
);