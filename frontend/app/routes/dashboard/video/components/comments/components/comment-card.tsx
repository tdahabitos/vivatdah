import { Text, Avatar, Group, ActionIcon, Loader } from '@mantine/core'
import { useState } from 'react'
import dayjs from '~/lib/dayjs'
import type { Comment, PublicUser } from '~/types'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '~/hooks/use-auth'

export function CommentCard({
  comment,
  onDelete,
}: {
  comment: Comment
  onDelete: () => Promise<void>
}) {
  const { user } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const commentUser = comment.user as PublicUser

  async function handleDelete() {
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
  }

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

        {user?.id === commentUser?.id && !isDeleting && (
          <ActionIcon size="xs" variant="subtle" onClick={handleDelete}>
            <IconX size={12} />
          </ActionIcon>
        )}
        {isDeleting && <Loader type="dots" />}
      </div>
      <Text pl={56} size="sm">
        {comment.comment}
      </Text>
    </div>
  )
}
