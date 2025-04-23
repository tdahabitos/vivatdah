import { ActionIcon } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/use-auth";
import { getSaved, sendSaved } from "~/lib/api";

export default function SaveButton({ videoId }: { videoId: string }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  async function checkIfSaved() {
    if (!user) return;

    await getSaved(videoId, user.id).then((res) => setIsSaved(res));
  }

  async function saveToggle() {
    if (!user) return;

    sendSaved(videoId, user.id, isSaved ? "unsave" : "save").then((res) => {
      setIsSaved(res);
    });
  }

  useEffect(() => {
    checkIfSaved();
  });

  return (
    <ActionIcon variant="default" onClick={saveToggle}>
      {isSaved ? (
        <IconBookmarkFilled size={16} color="violet" />
      ) : (
        <IconBookmark size={16} />
      )}
    </ActionIcon>
  );
}
