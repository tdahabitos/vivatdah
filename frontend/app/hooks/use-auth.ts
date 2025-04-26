import { useEffect, useState } from "react";
import { getUserAllowedCategories } from "~/lib/api";
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

    await getUserAllowedCategories(user.email).then((res) =>
      setAllowedCategories(res.map((c) => c.id))
    );
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
