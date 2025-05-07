import { IconArrowLeftFromArc } from '@tabler/icons-react'
import Empty from '~/components/empty'
import VideoCard from '~/components/video-card'
import { api } from '~/lib/api'
import type { PandaVideo, View } from '~/types'
import type { Route } from './+types'
import { getPageMeta } from '~/utils'
import { Suspense } from 'react'
import SkeletonVideoGrid from '~/components/skeleton-video-grid'
import { Await } from 'react-router'

export const meta = () => getPageMeta({ pageTitle: 'Salvos' })

export async function clientLoader() {
  const savedList = await api('/videos/list/saved')

  const videos = Promise.all(
    savedList.map((video: View) => api(`/videos/${video.video_id}`))
  )

  return {
    videos,
  }
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconArrowLeftFromArc size={24} />
        <h2 className="text-2xl font-semibold">Salvos</h2>
      </div>

      <Suspense fallback={<SkeletonVideoGrid cols={8} />}>
        <Await resolve={videos}>
          {(data) =>
            data.length === 0 ? (
              <Empty />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 space-y-6">
                {data.map((video: PandaVideo) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )
          }
        </Await>
      </Suspense>
    </div>
  )
}
