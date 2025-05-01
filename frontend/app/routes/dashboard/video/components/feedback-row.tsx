import { apiFetcher, sendVideoFeedback } from '~/lib/api'
import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ActionIcon } from '@mantine/core'
import type { FeedbackType } from '~/types'

export default function FeedbackRow({ videoId }: { videoId: string }) {
  const [feedback, setFeedback] = useState<FeedbackType | null>(null)
  const [positiveCount, setPositiveCount] = useState<number>(0)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleFeedback(type: FeedbackType | null) {
    setIsSendingFeedback(true)

    await sendVideoFeedback(videoId, type).then(() => getFeedback())

    setIsSendingFeedback(false)
  }

  async function getFeedback() {
    const feedback = await apiFetcher(`/videos/${videoId}/feedback`)
    const positiveCount = await apiFetcher(
      `/videos/${videoId}/feedback/positive`
    )

    setFeedback(feedback)
    setPositiveCount(positiveCount)
  }

  useEffect(() => {
    getFeedback()
  }, [])

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <ActionIcon
          variant={feedback === 'positive' ? 'filled' : 'light'}
          disabled={isSendingFeedback}
          onClick={() =>
            handleFeedback(feedback === 'positive' ? null : 'positive')
          }
        >
          {feedback === 'negative' ? (
            <IconThumbUpFilled size={16} />
          ) : (
            <IconThumbUp size={16} />
          )}
        </ActionIcon>
        <span className="text-xs">{positiveCount}</span>
      </div>
      <ActionIcon
        variant={feedback === 'negative' ? 'filled' : 'light'}
        disabled={isSendingFeedback}
        onClick={() =>
          handleFeedback(feedback === 'negative' ? null : 'negative')
        }
      >
        {feedback === 'negative' ? (
          <IconThumbDownFilled size={16} />
        ) : (
          <IconThumbDown size={16} />
        )}
      </ActionIcon>
    </div>
  )
}
