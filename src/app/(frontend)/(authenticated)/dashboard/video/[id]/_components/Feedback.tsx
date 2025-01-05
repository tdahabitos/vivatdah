import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { ActionIcon } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Feedback() {
  const [likesCount, setLikesCount] = useState(0);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState<boolean>();
  const [isDislikedByCurrentUser, setIsDislikedByCurrentUser] =
    useState<boolean>();

  const { id } = useParams();
  const { user } = useUserStore();

  async function getLikesCount() {
    const { data: likesCount } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "like")
      .eq("reference_id", id);

    setLikesCount(likesCount?.length);
  }

  async function getMetadata() {
    await getLikesCount();

    const { data: isLiked } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "like")
      .eq("reference_id", id)
      .eq("user_id", user?.id)
      .single();

    setIsLikedByCurrentUser(isLiked);

    const { data: isDisliked } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "dislike")
      .eq("reference_id", id)
      .eq("user_id", user?.id)
      .single();

    setIsDislikedByCurrentUser(isDisliked);
  }

  async function handleLikeClick() {
    setIsDislikedByCurrentUser(false);

    await supabase
      .schema("metadata")
      .from("events")
      .delete()
      .eq("event", "dislike")
      .eq("reference_id", id)
      .eq("user_id", user?.id);

    if (isLikedByCurrentUser) {
      setIsLikedByCurrentUser(false);

      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "like")
        .eq("reference_id", id)
        .eq("user_id", user?.id);

      return;
    }

    setIsLikedByCurrentUser(true);

    await supabase
      .schema("metadata")
      .from("events")
      .insert({ event: "like", reference_id: id, user_id: user?.id });
  }

  async function handleDislikeClick() {
    setIsLikedByCurrentUser(false);

    await supabase
      .schema("metadata")
      .from("events")
      .delete()
      .eq("event", "like")
      .eq("reference_id", id)
      .eq("user_id", user?.id);

    if (isDislikedByCurrentUser) {
      setIsDislikedByCurrentUser(false);

      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "dislike")
        .eq("reference_id", id)
        .eq("user_id", user?.id);

      return;
    }

    setIsDislikedByCurrentUser(true);

    await supabase
      .schema("metadata")
      .from("events")
      .insert({ event: "dislike", reference_id: id, user_id: user?.id });
  }

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <ActionIcon
          variant={isLikedByCurrentUser ? "filled" : "light"}
          onClick={async () => {
            await handleLikeClick();
            getLikesCount();
          }}
        >
          <IconThumbUp size={16} />
        </ActionIcon>
        <span className="text-xs">{likesCount}</span>
      </div>
      <ActionIcon
        variant={isDislikedByCurrentUser ? "filled" : "light"}
        onClick={async () => {
          await handleDislikeClick();
          getLikesCount();
        }}
      >
        <IconThumbDown size={16} />
      </ActionIcon>
    </div>
  );
}
