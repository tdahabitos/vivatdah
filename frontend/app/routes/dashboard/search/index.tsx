import { IconSearch } from '@tabler/icons-react'
import VideoCard from '~/components/video-card'
import FileCard from '~/components/file-card'
import Empty from '~/components/empty'
import type { Route } from './+types'
import type { Media, PandaVideo } from '~/types'
import { Divider } from '@mantine/core'
import { cn, getPageMeta } from '~/utils'
import { api } from '~/lib/api'
import { Suspense } from 'react'
import SkeletonVideoGrid from '~/components/skeleton-video-grid'
import { Await } from 'react-router'

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: `Pesquisa | "${data.value}"` })

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const value = url.searchParams.get('value')

  const results = api(`/search?value=${value}`)

  return { value, results }
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { value, results } = loaderData

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconSearch size={24} />
        <h2 className="text-2xl font-semibold">Pesquisa - "{value}"</h2>
      </div>

      <Suspense fallback={<SkeletonVideoGrid cols={8} />}>
        <Await resolve={results}>
          {(data) => (
            <>
              {data.videos?.length === 0 && data.files?.length === 0 && (
                <Empty />
              )}

              <div className={cn(data.videos.length === 0 && 'hidden')}>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Vídeos</h2>
                  <Divider />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.videos.map((video: PandaVideo) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>

              <div className={cn(data.files.length === 0 && 'hidden')}>
                <div className="mb-4">
                  <h2 className="font-semibold mb-1">Arquivos</h2>
                  <Divider />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.files.map((file: Media) => (
                    <FileCard key={file.id} file={file} />
                  ))}
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
