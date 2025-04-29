import { Text, Avatar, Group, Skeleton, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import dayjs from "~/lib/dayjs";
import type { Comment, PublicUser } from "~/types";
import { IconX } from "@tabler/icons-react";
import { apiFetcher } from "~/lib/api";
import { useAuth } from "~/hooks/use-auth";

export function CommentCard({
  comment,
  onDelete,
}: {
  comment: Comment;
  onDelete: () => void;
}) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [commentUser, setCommentUser] = useState<PublicUser | null>(null);

  async function getCommentUser() {
    await apiFetcher(`/users/${comment.user_id}`)
      .then((res) => setCommentUser(res))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getCommentUser();
  }, []);

  if (isLoading)
    return (
      <div className="flex flex-col gap-1">
        <Skeleton w="100%" h={35} />
        <Skeleton w="50%" h={20} />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center">
        <Group>
          <div className="p-1 border-white/50 border-solid border rounded-full">
            <Avatar size="sm" src={commentUser?.avatar} />
          </div>
          <div className="flex items-center gap-2">
            <Text size="sm" c="dimmed">
              {commentUser?.name}
            </Text>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              {dayjs(comment?.createdAt).fromNow()}
            </Text>
          </div>
        </Group>

        {user?.id === commentUser?.id && (
          <ActionIcon size="xs" variant="subtle" onClick={onDelete}>
            <IconX size={12} />
          </ActionIcon>
        )}
      </div>
      <Text pl={56} size="sm">
        {comment.comment}
      </Text>
    </div>
  );
}
