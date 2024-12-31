"use client";

import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { cn, uuid } from "@/utils";
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Group,
  Loader,
  Select,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPencil } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import { z } from "zod";
import { notifications } from "@mantine/notifications";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const { user, setUser } = useUserStore();

  const validationSchema = z.object({
    name: z
      .string({ message: "O campo é obrigatorio" })
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres"),
    email: z
      .string()
      .min(3, "O email deve ter pelo menos 3 caracteres")
      .max(50, "O email deve ter no máximo 50 caracteres")
      .email("Email inválido"),
    notificationsFrequency: z.string({ message: "O campo é obrigatorio" }),
    newsletterFrequency: z.string({ message: "O campo é obrigatorio" }),
  });

  const form = useForm({
    validate: zodResolver(validationSchema),
  });

  async function handleAvatarUpload(file: File) {
    setIsAvatarUploading(true);

    const userId = user.id;
    const fileType = file.type.split("/")[1];
    const bucket = "main";

    await supabase.storage
      .from(bucket)
      .upload(`avatar/${userId}.${fileType}`, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: "3600",
      });

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(bucket)
      .getPublicUrl(`avatar/${userId}.${fileType}`);

    const {
      data: { user: updatedUser },
    } = await supabase.auth.updateUser({
      data: {
        avatar: `${publicUrl}?uc=${uuid()}`,
      },
    });

    setUser(updatedUser);
    setIsAvatarUploading(false);

    notifications.show({
      color: "green",
      position: "bottom-left",
      message: "Avatar atualizado com sucesso",
    });
  }

  async function handleSubmit(data) {
    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.updateUser({
      email: data.email,
      data: {
        full_name: data.name,
        notificationsFrequency: data.notificationsFrequency,
        newsletterFrequency: data.newsletterFrequency,
      },
    });

    setIsSubmitting(false);
    setUser(user);

    notifications.show({
      color: "green",
      position: "bottom-left",
      message: "Perfil atualizado com sucesso",
    });
  }

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user.user_metadata?.full_name,
        email: user.email,
        notificationsFrequency: user.user_metadata?.notificationsFrequency,
        newsletterFrequency: user.user_metadata?.newsletterFrequency,
      });

      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton h={150} />
        <Skeleton h={250} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Minha conta</h2>
      <Group wrap="nowrap">
        <div className="relative">
          <Avatar src={user?.user_metadata?.avatar} size={94} />

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            multiple={false}
            onChange={(e) => handleAvatarUpload(e.target.files[0])}
          />

          <Loader
            className={cn(
              !isAvatarUploading && "hidden",
              "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
            )}
          />

          <ActionIcon
            className="absolute bottom-0 right-0"
            radius="xl"
            component="label"
            htmlFor="avatar-upload"
          >
            <IconPencil size={16} />
          </ActionIcon>
        </div>
        <div>
          <Text fz="lg" fw={500}>
            {user?.user_metadata?.full_name}
          </Text>

          <Text fz="xs" c="dimmed">
            {user?.email}
          </Text>
        </div>
      </Group>

      <form
        className="flex flex-col gap-6"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <TextInput
          placeholder="Name"
          label="Name"
          disabled={isSubmitting}
          {...form.getInputProps("name")}
        />

        <TextInput
          placeholder="E-mail"
          label="E-mail"
          disabled={isSubmitting}
          {...form.getInputProps("email")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            allowDeselect={false}
            label="Envio de notificações"
            placeholder="Frequência"
            data={["Nunca", "Diariamente", "Semanal", "Mensal"]}
            disabled={isSubmitting}
            {...form.getInputProps("notificationsFrequency")}
          />

          <Select
            allowDeselect={false}
            label="Novidades e lembretes"
            placeholder="Frequência"
            data={["Nunca", "Diariamente", "Semanal", "Mensal"]}
            disabled={isSubmitting}
            {...form.getInputProps("newsletterFrequency")}
          />
        </div>

        <Divider className="my-4" />

        <Button type="submit" loading={isSubmitting}>
          Enviar
        </Button>
      </form>
    </div>
  );
}
