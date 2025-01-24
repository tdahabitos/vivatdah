"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function AuthProvider({ user, children }) {
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return children;
}
