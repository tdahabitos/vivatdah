import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { ActionIcon } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SaveButton() {
  const { slug } = useParams();
  const { user } = useUserStore();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  async function getData() {
    const { data } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "save")
      .eq("reference_id", slug);

    setIsSaved(data?.length > 0);
  }

  async function handleSaveClick() {
    setIsSaved(!isSaved);

    if (isSaved) {
      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "save")
        .eq("reference_id", slug);
    } else {
      await supabase
        .schema("metadata")
        .from("events")
        .insert({ event: "save", reference_id: slug, user_id: user?.id })
        .single();
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ActionIcon variant="default" onClick={handleSaveClick}>
      {isSaved ? (
        <IconBookmarkFilled size={16} color="violet" />
      ) : (
        <IconBookmark size={16} />
      )}
    </ActionIcon>
  );
}
