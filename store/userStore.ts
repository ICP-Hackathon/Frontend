import create from "zustand";

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
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
