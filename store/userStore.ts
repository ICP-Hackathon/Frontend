import create from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    user_address: string;
    nickname: string;
    image_url: string;
    gender?: string;
    country?: string;
    phone?: string;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
