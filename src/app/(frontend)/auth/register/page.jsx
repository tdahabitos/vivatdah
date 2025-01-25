"use client";

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "@/components/Logo";
import { useState } from "react";
import Link from "next/link";
import { IconMailCheck } from "@tabler/icons-react";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import GoogleAuthButton from "../_components/GoogleAuthButton";
import { supabase } from "@/services/supabase/client";

export default function Register() {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = z.object({
    name: z.string({ message: "O campo é obrigatorio" }),
    email: z
      .string({ message: "O campo é obrigatorio" })
      .email({ message: "E-mail inválido" }),
    password: z.string({ message: "O campo é obrigatorio" }),
    terms: z.boolean({ message: "O campo é obrigatorio" }),
  });

  const form = useForm({
    validate: zodResolver(validationSchema),
  });

  async function handleSubmit({ name, email, password, terms }) {
    setIsLoading(true);

    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          terms,
        },
      },
    });

    setEmailSent(true);
    setIsLoading(false);
  }

  if (emailSent) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center p-8">
        <Paper w="100%" maw="450px" p="xl" withBorder>
          <div className="flex justify-center mb-4">
            <Logo className="h-20 w-auto" />
          </div>

          <Divider labelPosition="center" my="lg" />

          <div className="flex flex-col items-center gap-4">
            <IconMailCheck size={64} />
            <h3 className="font-bold">Verifique a sua conta</h3>
            <p className="text-sm">
              Um e-mail de confirmação foi enviado para o seu e-mail
            </p>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-8">
      <Paper w="100%" maw="450px" p="xl" withBorder>
        <div className="flex justify-center mb-4">
          <Logo className="h-20 w-auto" />
        </div>

        <Divider label="Registre-se" labelPosition="center" my="lg" />

        <Group grow mb="md" mt="md">
          <GoogleAuthButton />
        </Group>

        <Divider label="Ou continue com email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Nome"
              placeholder="Nome"
              disabled={isLoading}
              {...form.getInputProps("name")}
            />

            <TextInput
              label="E-mail"
              placeholder="meu-melhor@email.com"
              disabled={isLoading}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Senha"
              placeholder="Senha"
              disabled={isLoading}
              {...form.getInputProps("password")}
            />

            <Checkbox
              label="Aceito os termos e condições"
              disabled={isLoading}
              {...form.getInputProps("terms", { type: "checkbox" })}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component={Link}
              href="/auth/login"
              type="button"
              c="dimmed"
              size="xs"
            >
              Já tem uma conta? Login
            </Anchor>

            <Button type="submit">Enviar</Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
