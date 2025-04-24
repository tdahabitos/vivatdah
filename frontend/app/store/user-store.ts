import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  allowedCategories: string[] | null;
  setAllowedCategories: (categories: string[]) => void;
};

export const useUser = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  allowedCategories: null,
  setAllowedCategories: (categories) => set({ allowedCategories: categories }),
}));
