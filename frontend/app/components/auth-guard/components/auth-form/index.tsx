import { useMantineColorScheme } from "@mantine/core";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "~/lib/supabase";
import ptBR from "./pt-br.json";

export default function AuthForm({
  isPrivateAuthMode,
}: {
  isPrivateAuthMode: boolean;
}) {
  const { colorScheme } = useMantineColorScheme();

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
      theme={colorScheme}
      showLinks={!isPrivateAuthMode}
      providers={isPrivateAuthMode ? [] : ["google"]}
      localization={{ variables: { ...ptBR } }}
    />
  );
}
