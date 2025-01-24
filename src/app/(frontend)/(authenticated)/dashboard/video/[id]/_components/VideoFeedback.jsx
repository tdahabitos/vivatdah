import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { ActionIcon } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VideoFeedback() {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState();
  const [isDisliked, setIsDisliked] = useState();

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

    setIsLiked(isLiked);

    const { data: isDisliked } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "dislike")
      .eq("reference_id", id)
      .eq("user_id", user?.id)
      .single();

    setIsDisliked(isDisliked);
  }

  async function handleLikeClick() {
    setIsDisliked(false);

    await supabase
      .schema("metadata")
      .from("events")
      .delete()
      .eq("event", "dislike")
      .eq("reference_id", id)
      .eq("user_id", user?.id);

    if (isLiked) {
      setIsLiked(false);

      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "like")
        .eq("reference_id", id)
        .eq("user_id", user?.id);

      return;
    }

    setIsLiked(true);

    await supabase
      .schema("metadata")
      .from("events")
      .insert({ event: "like", reference_id: id, user_id: user?.id });
  }

  async function handleDislikeClick() {
    setIsLiked(false);

    await supabase
      .schema("metadata")
      .from("events")
      .delete()
      .eq("event", "like")
      .eq("reference_id", id)
      .eq("user_id", user?.id);

    if (isDisliked) {
      setIsDisliked(false);

      await supabase
        .schema("metadata")
        .from("events")
        .delete()
        .eq("event", "dislike")
        .eq("reference_id", id)
        .eq("user_id", user?.id);

      return;
    }

    setIsDisliked(true);

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
          variant={isLiked ? "filled" : "light"}
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
        variant={isDisliked ? "filled" : "light"}
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
