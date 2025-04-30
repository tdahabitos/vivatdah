import { getPageMeta } from "~/utils";
import type { Route } from "./+types";
import { useEffect, useState } from "react";
import { Loader, Paper } from "@mantine/core";
import Logo from "~/components/logo";
import PrivateAuthForm from "./components/private-auth-form";
import AuthForm from "./components/auth-form";
import { apiFetcher } from "~/lib/api";
import { supabase } from "~/lib/supabase";
import { useNavigate } from "react-router";

export const meta = () => getPageMeta({ pageTitle: "Auth" });

export async function clientLoader() {
  const { auth_private_mode } = await apiFetcher("/config");

  return { isPrivateAuthMode: auth_private_mode };
}

export default function Auth({ loaderData }: Route.ComponentProps) {
  const { isPrivateAuthMode } = loaderData;
  const [isUserAllowedToAccess, setIsUserAllowedToAccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        navigate("/dashboard");
        setIsRedirecting(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <Paper w="100%" maw="450px" p="xl" withBorder>
        <div className="flex justify-center mb-4">
          <Logo className="h-20 w-auto" />
        </div>

        {isRedirecting ? (
          <div className="flex justify-center">
            <Loader size="xl" type="dots" />
          </div>
        ) : isPrivateAuthMode && !isUserAllowedToAccess ? (
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
