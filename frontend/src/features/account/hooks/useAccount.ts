import { useEffect, useState } from "react"

import type { User } from "../../../types/user";

import { getMyProfile } from "../api/account";

import { useAuthStore } from "../../auth/store/userStore";

export const useAccount = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<User | null>(null);
    const { removeUser } = useAuthStore();

    const fetchData = async () => {
        setError("")
        setLoading(true);

        try {
            const response = await getMyProfile();
            if (response) setData(response);
        } catch (err: any) {
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    }

    const LogOut = () => {
        removeUser();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, LogOut }
}