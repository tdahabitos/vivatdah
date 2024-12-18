"use client";

import { useMemo } from "react";
import { useUserStore } from "@/store/userStore";

export default function AuthProvider({
  user,
  children,
}: { user: any; children: React.ReactNode }) {
  const { setUser } = useUserStore();

  useMemo(() => setUser(user), [setUser, user]);

  return children;
}
