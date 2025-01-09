import { Text, Avatar, Group, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";
import CommentFeedback from "./CommentFeedback";
import { dayjs } from "@/lib/dayjs";
import axios from "axios";

export function CommentCard({ comment }) {
  const [isLoading, setIsLoading] = useState(true);
  const [commentUser, setCommentUser] = useState(null);

  async function getCommentUser() {
    await axios
      .get(`/api/public/users/${comment.user_id}`)
      .then((res) => setCommentUser(res.data))
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

  console.log(commentUser);

  return (
    <div>
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
            {dayjs(comment?.created_at).fromNow()}
          </Text>
        </div>
      </Group>
      <Text pl={56} size="sm">
        {comment.comment}
      </Text>
      <div className="flex pl-14 mt-4 gap-4">
        <CommentFeedback id={comment.id} />
      </div>
    </div>
  );
}
