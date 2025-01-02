import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FavoriteButton() {
  const { slug } = useParams();
  const { user } = useUserStore();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  async function getData() {
    const { data } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "favorite")
      .eq("reference_id", slug);

    setIsFavorited(data?.length > 0);
  }

  async function handleFavoriteClick() {
    setIsFavorited(!isFavorited);

    if (isFavorited) {
      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "favorite")
        .eq("reference_id", slug);
    } else {
      await supabase
        .schema("metadata")
        .from("events")
        .insert({ event: "favorite", reference_id: slug, user_id: user?.id })
        .single();
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ActionIcon variant="default" onClick={handleFavoriteClick}>
      {isFavorited ? (
        <IconHeartFilled size={16} color="red" />
      ) : (
        <IconHeart size={16} />
      )}
    </ActionIcon>
  );
}
