import { Menu } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation, useRevalidator } from "react-router";
import { useAuth } from "~/hooks/use-auth";
import { apiFetcher, saveVideo, unsaveVideo } from "~/lib/api";

export default function SaveButton({ videoId }: { videoId: string }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revalidator = useRevalidator();
  const { pathname } = useLocation();

  async function checkIfSaved() {
    if (!user) return;

    await apiFetcher(`/videos/${videoId}/saved`).then((res) => setIsSaved(res));
  }
  
  async function saveToggle() {
    setIsSubmitting(true);

    isSaved ? await unsaveVideo(videoId) : await saveVideo(videoId);

    setIsSaved(!isSaved);
    setIsSubmitting(false);

    pathname === "/dashboard/saved" && revalidator.revalidate();
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
