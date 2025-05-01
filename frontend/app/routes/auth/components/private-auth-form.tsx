import { Button, InputLabel, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import type { FormData } from "~/types";
import { apiFetcher } from "~/lib/api";

export default function PrivateAuthForm({
  setIsUserAllowedToAccess,
}: {
  setIsUserAllowedToAccess: (value: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = z.object({
    email: z
      .string({ message: "O campo é obrigatorio" })
      .email({ message: "E-mail inválido" }),
  });

  const form = useForm({
    validate: zodResolver(validationSchema),
  });

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true);

    const isAllowedUser = await apiFetcher(`/users/auth-check?email=${data.email}`)
      .catch(() => false)
      .finally(() => {
        setIsSubmitting(false);
      });

    setIsUserAllowedToAccess(isAllowedUser);

    if (!isAllowedUser) {
      form.setFieldError(
        "email",
        "Usuário incorreto ou não autorizado. Por favor, contate o suporte: contato@vivatdah.com"
      );

      setIsSubmitting(false);

      return;
    }
  }

  return (
    <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
      <InputLabel className="mb-2">E-mail</InputLabel>
      <TextInput
        placeholder="Seu e-mail"
        type="email"
        disabled={isSubmitting}
        radius="sm"
        {...form.getInputProps("email")}
      />

      <div className="flex justify-end">
        <Button type="submit" radius="sm" loading={isSubmitting}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
