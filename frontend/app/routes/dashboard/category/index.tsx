import { IconArrowLeftFromArc } from '@tabler/icons-react'
import Empty from '~/components/empty'
import VideoCard from '~/components/video-card'
import { api } from '~/lib/api'
import type { Category, PandaVideo } from '~/types'
import type { Route } from './+types'
import FileList from './components/file-list'
import { Await, useNavigate } from 'react-router'
import { Suspense, useEffect, useState } from 'react'
import { getPageMeta } from '~/utils'
import SkeletonVideoGrid from '~/components/skeleton-video-grid'
import { useAuth } from '~/hooks/use-auth'

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: data.category.title })

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params

  const category = (await api(`/categories/${id}`)) as Category
  const files = api(`/categories/${id}/media`)
  const videos = api(`/videos/folder/${category.panda_folder_id}`)

  return {
    category,
    videos,
    files,
  }
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { category, videos, files } = loaderData

  const { allowedCategories } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const navigate = useNavigate()

  function checkAccess() {
    if (!allowedCategories) return

    if (allowedCategories.includes(category.id)) {
      setHasAccess(true)
      return
    }

    navigate(`/${import.meta.env.VITE_PLANS_PAGE_PATH}`)
  }

  useEffect(() => {
    checkAccess()
  }, [allowedCategories])

  if (!hasAccess) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <IconArrowLeftFromArc size={24} />
          <h2 className="text-2xl font-semibold">{category?.title}</h2>
        </div>

        <Suspense fallback={null}>
          <Await resolve={files}>{(data) => <FileList files={data} />}</Await>
        </Suspense>
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
