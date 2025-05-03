import { IconArrowLeftFromArc } from '@tabler/icons-react'
import Empty from '~/components/empty'
import VideoCard from '~/components/video-card'
import { apiFetcher } from '~/lib/api'
import type { PandaVideo, View } from '~/types'
import type { Route } from './+types'
import { getPageMeta } from '~/utils'
import { Suspense } from 'react'
import { Await } from 'react-router'
import SkeletonVideoGrid from '~/components/skeleton-video-grid'

export const meta = () => getPageMeta({ pageTitle: 'Mais populares' })

export async function clientLoader() {
  const trendingList = await apiFetcher('videos/list/trending')

  const videos = Promise.all(
    trendingList.map((video: View) => apiFetcher(`videos/${video.video_id}`))
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
        <h2 className="text-2xl font-semibold">Trending</h2>
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
