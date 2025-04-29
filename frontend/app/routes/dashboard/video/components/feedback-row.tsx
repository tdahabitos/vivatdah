import { apiFetcher } from "~/lib/api";
import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/use-auth";
import { ActionIcon } from "@mantine/core";
import type { Feedback } from "~/types";

export default function FeedbackRow({ videoId }: { videoId: string }) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [positiveCount, setPositiveCount] = useState<number>(0);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const { user } = useAuth();
  const isSaved = true;

  async function handleFeedback(type: Feedback) {
    if (!user) return;
    setIsSendingFeedback(true);

    /* const { feedback, totalPositive } = await sendFeedback(
      videoId,
      user.id,
      type
    );
    setFeedback(feedback);
    setTotalPositive(totalPositive); */

    setIsSendingFeedback(false);
  }

  async function getInitialFeedback() {
    if (!user) return;

    const { feedback, positiveCount } = await apiFetcher(
      `/videos/${videoId}/feedback`
    );

    feedback && setFeedback(feedback);
    setPositiveCount(positiveCount);
  }

  useEffect(() => {
    getInitialFeedback();
  }, [user]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <ActionIcon
          variant={feedback === "positive" ? "filled" : "light"}
          disabled={isSendingFeedback}
          onClick={() =>
            handleFeedback(feedback === "positive" ? null : "positive")
          }
        >
          {feedback === "positive" ? (
            <IconThumbUpFilled size={16} />
          ) : (
            <IconThumbUp size={16} />
          )}
        </ActionIcon>
        <span className="text-xs">{positiveCount}</span>
      </div>
      <ActionIcon
        variant={feedback === "negative" ? "filled" : "light"}
        disabled={isSendingFeedback}
        onClick={() =>
          handleFeedback(feedback === "negative" ? null : "negative")
        }
      >
        {feedback === "negative" ? (
          <IconThumbDownFilled size={16} />
        ) : (
          <IconThumbDown size={16} />
        )}
      </ActionIcon>
    </div>
  );
}
