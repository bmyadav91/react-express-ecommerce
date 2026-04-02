import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../../../types/user";


interface AuthState {
    user: User | null;
    token: string | null;

    setUser: (user: User, token: string) => void;
    removeUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            setUser: (user, token) =>
                set({
                    user,
                    token,
                }),

            removeUser: () =>
                set({
                    user: null,
                    token: null,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);