import { useMantineColorScheme } from "@mantine/core";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, type ViewType } from "@supabase/auth-ui-shared";
import { supabase } from "~/lib/supabase";
import { ptBR } from "./translations";
import { useMounted } from "@mantine/hooks";

export default function AuthForm({
  isPrivateAuthMode,
  type,
}: {
  isPrivateAuthMode?: boolean;
  type?: ViewType;
}) {
  const { colorScheme } = useMantineColorScheme();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#ffac36",
              brandAccent: "#ff9904",
            },
          },
        },
      }}
      view={type}
      theme={colorScheme}
      localization={{ variables: { ...ptBR } }}
      showLinks={!isPrivateAuthMode}
      providers={isPrivateAuthMode ? [] : ["google"]}
    />
  );
}
