import { User } from "@/utils/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  wallet: any | null;
  setUser: (user: User) => void;
  setUserWallet: (wallet: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      setUser: (user) => {
        console.log("Setting user in store:", user);
        set((state) => ({ ...state, user }));
      },
      setUserWallet: (wallet) => set((state) => ({ ...state, wallet })),
      clearUser: () => set({ user: null, wallet: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    },
  ),
);
