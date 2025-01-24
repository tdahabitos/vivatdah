import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/utils";
import { Avatar, Button, HoverCard, Textarea, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";

export default function Comments() {
  const { id } = useParams();
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  async function handleSubmit(data) {
    setIsSubmitting(true);

    const { error } = await supabase
      .schema("metadata")
      .from("comments")
      .insert({ reference_id: id, user_id: user?.id, comment: data.comment });

    if (!error) {
      form.reset();
      setIsSubmitting(false);
      getComments();
    }
  }

  async function getComments() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("comments")
      .select("*")
      .eq("reference_id", id);

    if (!error) {
      setComments(data);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Comentários</h3>

      <form className="space-y-2" onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          leftSection={
            <div className="p-1 border-white/50 border-solid border rounded-full">
              <Avatar size="sm" src={user?.user_metadata?.avatar} />
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
            form.values.comment !== "" && "flex",
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
            <Button variant="light" size="xs" disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" size="xs" loading={isSubmitting}>
              Comentar
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment?.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
