import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import PrivateAuthForm from "./components/private-auth-form";
import AuthForm from "./components/auth-form";
import { Paper } from "@mantine/core";
import Logo from "../logo";
import { supabase } from "~/lib/supabase";
import { useAuthConfig } from "~/store/auth-config-store";
import { useUser } from "~/store/user-store";
import { getUserAllowedCategories } from "~/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isUserAllowedToAccess, setIsUserAllowedToAccess] = useState(false);
  const { isPrivateAuthMode } = useAuthConfig();
  const { setAllowedCategories } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        setSession(session);

        await getUserAllowedCategories(session?.user.email).then((res) =>
          setAllowedCategories(res.map((c) => c.id))
        );
      })
      .finally(() => setIsLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading || isPrivateAuthMode === null) {
    return null;
  }

  if (!session) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center p-4">
        <Paper w="100%" maw="450px" p="xl" withBorder>
          <div className="flex justify-center mb-4">
            <Logo className="h-20 w-auto" />
          </div>

          {isPrivateAuthMode && !isUserAllowedToAccess ? (
            <PrivateAuthForm
              setIsUserAllowedToAccess={setIsUserAllowedToAccess}
            />
          ) : (
            <AuthForm isPrivateAuthMode={isPrivateAuthMode} />
          )}
        </Paper>
      </div>
    );
  }

  return children;
}
