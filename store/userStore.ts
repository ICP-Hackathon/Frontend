import { User } from "@/utils/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  wallet: any | null;
  setUser: (user: User | null) => void;
  setUserWallet: (wallet: any | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      setUser: (user) => set({ user }),
      setUserWallet: (wallet) => set({ wallet }),
      clearUser: () => set({ user: null, wallet: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    },
  ),
);
