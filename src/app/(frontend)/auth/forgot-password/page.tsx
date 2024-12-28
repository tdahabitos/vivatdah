"use client";

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "@/components/Logo";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { supabase } from "@/services/supabase/client";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validationSchema = z.object({
    email: z
      .string({ message: "O campo é obrigatorio" })
      .email({ message: "E-mail inválido" }),
  });

  const form = useForm({
    validate: zodResolver(validationSchema),
  });

  async function handleSubmit(data) {
    setIsLoading(true);

    await supabase.auth
      .resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:3000/auth/new-password",
      })
      .then(() => setSent(true))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Paper w="100%" maw="450px" p="xl" withBorder>
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-2 mb-4">
            <IconMail size={48} />
            <Divider />
            <span className="text-center">
              Confira o seu e-mail e siga as instruções para redefinir sua
              senha.
            </span>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="E-mail"
              placeholder="meu-melhor@email.com"
              disabled={isLoading}
              {...form.getInputProps("email")}
            />

            <Group justify="space-between" mt="xl">
              <Anchor
                component={Link}
                href="/auth/login"
                type="button"
                c="dimmed"
                size="xs"
                className="flex items-center gap-1"
              >
                <IconArrowLeft size={16} />
                <span>Voltar</span>
              </Anchor>

              <Button type="submit" loading={isLoading}>
                Enviar
              </Button>
            </Group>
          </form>
        )}
      </Paper>
    </div>
  );
}
