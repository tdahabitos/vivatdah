import { useState, useEffect } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { Paper, useMantineColorScheme } from "@mantine/core";
import Logo from "./logo";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "~/lib/supabase";

const ptBR = {
  sign_in: {
    email_label: "E-mail",
    password_label: "Senha",
    email_input_placeholder: "Seu e-mail",
    password_input_placeholder: "Sua senha",
    button_label: "Entrar",
    loading_button_label: "Entrando...",
    link_text: "Já tem uma conta? Entre",
    social_provider_text: "Entrar com {{provider}}",
  },
  sign_up: {
    email_label: "E-mail",
    password_label: "Senha",
    email_input_placeholder: "Seu e-mail",
    password_input_placeholder: "Crie uma senha",
    button_label: "Cadastrar",
    loading_button_label: "Cadastrando...",
    link_text: "Não tem uma conta? Cadastre-se",
    social_provider_text: "Cadastrar com {{provider}}",
  },
  forgotten_password: {
    email_label: "E-mail",
    password_label: "Senha",
    email_input_placeholder: "Seu e-mail",
    button_label: "Enviar link de recuperação",
    loading_button_label: "Enviando...",
    link_text: "Esqueceu a senha?",
    confirmation_text: "Confira seu e-mail para o link de recuperação",
  },
  magic_link: {
    email_input_label: "E-mail",
    email_input_placeholder: "Seu e-mail",
    button_label: "Enviar link mágico",
    loading_button_label: "Enviando...",
    link_text: "Entrar com link mágico",
    confirmation_text: "Verifique seu e-mail para o link mágico",
  },
};

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .finally(() => setIsLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!session) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center p-4">
        <Paper w="100%" maw="450px" p="xl" withBorder>
          <div className="flex justify-center mb-4">
            <Logo className="h-20 w-auto" />
          </div>

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
            providers={["google"]}
            localization={{ variables: { ...ptBR } }}
          />
        </Paper>
      </div>
    );
  }

  return children;
}
