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
import { useAuth } from "~/hooks/use-auth";
import { supabase } from "~/lib/supabase";
import type { FormData } from "~/types";
import { cn, getPageMeta, uuid } from "~/utils";

export const meta = () => getPageMeta({ pageTitle: "Configurações" });

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [avatarUploadingError, setAvatarUploadingError] = useState(false);
  const { user, revalidate } = useAuth();

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
    if (!user) return;

    if (file.size > 1 * 1024 * 1024) {
      setAvatarUploadingError(true);
      return;
    }

    setAvatarUploadingError(false);
    setIsAvatarUploading(true);

    const fileType = file.type.split("/")[1];
    const bucket = "main";

    await supabase.storage
      .from(bucket)
      .upload(`avatar/${user.id}.${fileType}`, file, {
        upsert: true,
        contentType: "image/jpeg",
        cacheControl: "3600",
      });

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(`avatar/${user.id}.jpeg`);

    await supabase.auth.updateUser({
      data: {
        avatar: `${publicUrl}?v=${uuid()}`,
      },
    });

    setIsAvatarUploading(false);
    revalidate();
  }

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true);

    await supabase.auth
      .updateUser({
        email: data.email,
        data: {
          full_name: data.name,
          notificationsFrequency: data.notificationsFrequency,
          newsletterFrequency: data.newsletterFrequency,
        },
      })
      .then(() => {
        revalidate();
      })
      .finally(() => setIsSubmitting(false));
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
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
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
            onChange={(e) => {
              if (e.target.files) {
                handleAvatarUpload(e.target.files[0]);
              }
            }}
          />

          <div
            className={cn(
              !isAvatarUploading && "hidden",
              "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            )}
          >
            <Loader />
          </div>

          <div className="absolute bottom-0 right-0">
            <ActionIcon radius="xl" component="label" htmlFor="avatar-upload">
              <IconPencil size={16} />
            </ActionIcon>
          </div>
        </div>

        <div>
          <Text fz="lg" fw={500}>
            {user?.user_metadata?.full_name}
          </Text>

          <Text fz="xs" c="dimmed" mb="sm">
            {user?.email}
          </Text>

          {avatarUploadingError && (
            <p className="text-sm text-red-400">
              O Arquivo é muito grande. Por favor, envie uma imagem de até{" "}
              <span className="font-bold">1MB</span>.
            </p>
          )}
        </div>
      </Group>

      <form
        className="flex flex-col gap-6"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            placeholder="Name"
            label="Name"
            disabled={isSubmitting}
            {...form.getInputProps("name")}
          />

          <TextInput
            placeholder="E-mail"
            label="E-mail"
            disabled={true}
            {...form.getInputProps("email")}
          />
        </div>

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

        <Divider />

        <div className="flex justify-end">
          <Button type="submit" loading={isSubmitting}>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
