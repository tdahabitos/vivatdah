import { useEffect, useState } from "react";
import { apiFetcher } from "~/lib/api";
import { supabase } from "~/lib/supabase";
import { useUser } from "~/store/user-store";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, allowedCategories, setAllowedCategories } = useUser();

  async function getUser() {
    await supabase.auth
      .getUser()
      .then((res) => {
        const user = res.data.user;
        if (user) setUser(user);
      })
      .finally(() => setIsLoading(false));
  }

  async function getAllowedCategories() {
    if (!user) return;

    await apiFetcher(
      `/users/access/allowed-categories?email=${user.email}`
    ).then((res) => setAllowedCategories(res));
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    getAllowedCategories();
  }, [user]);

  return {
    isLoading,
    user,
    allowedCategories,
    isAuthenticated: user !== null,
    logout: () => {
      supabase.auth.signOut(), setUser(null);
    },
    revalidate: getUser,
  };
}
