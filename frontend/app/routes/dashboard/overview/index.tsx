import { apiFetcher } from '~/lib/api'
import type { Route } from './+types'
import type { PandaVideo, View } from '~/types'
import VideoCard from '~/components/video-card'
import { getPageMeta } from '~/utils'
import { Suspense } from 'react'
import { Await } from 'react-router'
import SkeletonVideoGrid from '~/components/skeleton-video-grid'

export const meta = () => getPageMeta({ pageTitle: 'Home' })

export async function clientLoader() {
  const newVideos = apiFetcher(`/videos?page=1&limit=2`)
  const trendingList = await apiFetcher('/videos/list/trending?page=1&limit=4')

  const trendingVideos = Promise.all(
    trendingList.map((video: View) => apiFetcher(`/videos/${video.video_id}`))
  )

  return {
    newVideos,
    trendingVideos,
  }
}

export default function Overview({ loaderData }: Route.ComponentProps) {
  const { newVideos, trendingVideos } = loaderData

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">Novidades</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Suspense fallback={<SkeletonVideoGrid withoutGrid cols={2} />}>
            <Await resolve={newVideos}>
              {(data) =>
                data.map((video: PandaVideo) => (
                  <VideoCard key={video.id} video={video} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">Mais populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Suspense fallback={<SkeletonVideoGrid withoutGrid cols={4} />}>
            <Await resolve={trendingVideos}>
              {(data) =>
                data.map((video: PandaVideo) => (
                  <VideoCard key={video.id} video={video} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
