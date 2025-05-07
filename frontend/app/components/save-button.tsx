import { ActionIcon, Loader, Menu } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useLocation, useRevalidator } from 'react-router'
import { api, apiFetcher } from '~/lib/api'

export default function SaveButton({
  videoId,
  layout = 'default',
}: {
  videoId: string
  layout?: 'default' | 'menu'
}) {
  const [isSaved, setIsSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const revalidator = useRevalidator()
  const { pathname } = useLocation()

  async function checkIfSaved() {
    await api(`/videos/${videoId}/saved`).then((res) => setIsSaved(res))
  }

  async function toggle() {
    setIsSubmitting(true)

    isSaved
      ? await apiFetcher.delete(`/videos/${videoId}/saved`)
      : await apiFetcher.post(`/videos/${videoId}/saved`)

    setIsSaved(!isSaved)
    setIsSubmitting(false)

    pathname === '/dashboard/saved' && revalidator.revalidate()
  }

  useEffect(() => {
    checkIfSaved()
  })

  if (layout === 'menu') {
    return (
      <Menu.Item
        closeMenuOnClick={false}
        disabled={isSubmitting}
        leftSection={
          isSaved ? (
            <IconBookmarkFilled size={18} color="violet" />
          ) : (
            <IconBookmark size={18} />
          )
        }
        onClick={toggle}
      >
        {isSaved ? 'Remover dos salvos' : 'Adicionar aos salvos'}
      </Menu.Item>
    )
  }

  return (
    <ActionIcon variant="default" onClick={toggle} disabled={isSubmitting}>
      {isSubmitting && <Loader size={16} />}
      {!isSubmitting && (
        <>
          {isSaved ? (
            <IconBookmarkFilled size={16} color="violet" />
          ) : (
            <IconBookmark size={16} />
          )}
        </>
      )}
    </ActionIcon>
  )
}
