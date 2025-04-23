import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import { useUser } from "~/store/user-store";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();

  async function getUser() {
    await supabase.auth
      .getUser()
      .then((res) => {
        const user = res.data.user;
        if (user) setUser(user);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getUser();
  }, []);

  return {
    isLoading,
    user,
    logout: () => supabase.auth.signOut(),
    revalidate: getUser,
  };
}
