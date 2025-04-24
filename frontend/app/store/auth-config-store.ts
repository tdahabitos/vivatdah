import { create } from "zustand";

type AuthConfigStore = {
  isPrivateAuthMode: boolean | null;
  setIsPrivateAuthMode: (isPrivateAuthMode: boolean) => void;
};

export const useAuthConfig = create<AuthConfigStore>()((set) => ({
  isPrivateAuthMode: null,
  setIsPrivateAuthMode: (isPrivateAuthMode) => set({ isPrivateAuthMode }),
}));
