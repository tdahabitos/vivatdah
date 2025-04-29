import { Menu } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";
import { useAuth } from "~/hooks/use-auth";
import { apiFetcher } from "~/lib/api";

export default function SaveButton({ videoId }: { videoId: string }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revalidator = useRevalidator();

  async function checkIfSaved() {
    if (!user) return;

    await apiFetcher(`/videos/${videoId}/saved`).then((res) => setIsSaved(res));
  }

  async function saveToggle() {
    if (!user) return;

    setIsSubmitting(true);

    /* await sendSaved(videoId, user.id, isSaved ? "unsave" : "save")
      .then((res) => {
        setIsSaved(res);
      })
      .finally(() => setIsSubmitting(false)); */

    revalidator.revalidate();
  }

  useEffect(() => {
    checkIfSaved();
  });

  return (
    <Menu.Item
      closeMenuOnClick={false}
      disabled={isSubmitting}
      leftSection={
        isSaved ? (
          <IconBookmarkFilled size={18} color="violet" />
        ) : (
          <IconBookmark size={18} />
        )
      }
      onClick={saveToggle}
    >
      {isSaved ? "Remover dos salvos" : "Adicionar aos salvos"}
    </Menu.Item>
  );
}
