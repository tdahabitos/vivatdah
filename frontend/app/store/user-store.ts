import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  allowedCategories: string[];
  setAllowedCategories: (allowedCategories: string[]) => void;
};

export const useUser = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  allowedCategories: [],
  setAllowedCategories: (allowedCategories: string[]) =>
    set({ allowedCategories }),
}));
