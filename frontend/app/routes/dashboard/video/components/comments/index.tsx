import { cn } from "~/utils";
import { Avatar, Button, Divider, HoverCard, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/use-auth";
import { apiFetcher } from "~/lib/api";
import { CommentCard } from "./components/comment-card";
import type { Comment, FormData } from "~/types";

export default function Comments({ videoId }: { videoId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  const form = useForm();

  async function handleSubmit(data: FormData) {
    if (!user) return;
    setIsSubmitting(true);

    //TODO: implement
    /* sendComment(videoId, user.id, data.comment)
      .then((res) => {
        setComments((prev) => [res, ...prev]);
        form.reset();
      })
      .finally(() => setIsSubmitting(false)); */
  }

  async function handleDelete(id: string) {
    //TODO: implement
    /*  await deleteComment(id).then(() =>
      setComments(comments.filter((comment) => comment.id !== id))
    ); */
  }

  async function getVideoComments() {
    await apiFetcher(`/videos/${videoId}/comments`).then((res) =>
      setComments(res)
    );
  }

  useEffect(() => {
    getVideoComments();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Comentários</h3>

      <form className="space-y-2" onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          leftSection={
            <div className="p-1 border-white/50 border-solid border rounded-full">
              <Avatar
                size="sm"
                src={
                  user?.user_metadata.avatar || user?.user_metadata.avatar_url
                }
              />
            </div>
          }
          autosize
          minRows={2}
          leftSectionWidth={55}
          placeholder="Adicione um comentário"
          disabled={isSubmitting}
          {...form.getInputProps("comment")}
        />
        <div
          className={cn(
            "hidden justify-between gap-2",
            form.values.comment !== "" && "flex"
          )}
        >
          <HoverCard width={280} shadow="md" withArrow>
            <HoverCard.Target>
              <div className="flex items-center gap-1 opacity-50">
                <IconInfoCircle size={18} />
                <span className="text-xs">Regras gerais</span>
              </div>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <span className="text-xs">
                Seja respeitoso, evite linguagem ofensiva, contribua de forma
                construtiva e não compartilhe informações pessoais. Comentários
                que violem essas diretrizes poderão ser removidos.
              </span>
            </HoverCard.Dropdown>
          </HoverCard>

          <div className="flex gap-2">
            <Button
              type="submit"
              size="xs"
              loading={isSubmitting}
              rightSection={<IconSend size={16} />}
            >
              Comentar
            </Button>
          </div>
        </div>
      </form>

      <Divider className="my-8" />

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard
            key={comment?.id}
            comment={comment}
            onDelete={() => handleDelete(comment.id)}
          />
        ))}
      </div>
    </div>
  );
}
