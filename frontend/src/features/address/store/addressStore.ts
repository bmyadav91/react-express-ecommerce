import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Address } from "../../../types/Address";



interface Props {
    addresses: Address[];

    setAddress: (address: Address) => void;
    clearAddress: () => void;
}

export const useAddress = create<Props>()(
    persist((set) => ({
        addresses: [],

        setAddress: (address) => set(() => ({
            addresses: [address],
        })),

        clearAddress: () => set(() => ({
            addresses: [],
        })),
    }),
        {
            name: "address-storage",
        }
    )
)