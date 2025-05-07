import { Card, Divider, Spoiler, Text } from '@mantine/core'
import type { Route } from './+types'
import VideoCard from '~/components/video-card'
import { api, apiFetcher } from '~/lib/api'
import dayjs from '~/lib/dayjs'
import FeedbackRow from './components/feedback-row'
import Comments from './components/comments'
import { getPageMeta, removeExtension } from '~/utils'
import type { PandaVideo } from '~/types'
import SaveButton from '~/components/save-button'
import { Suspense } from 'react'
import { Await } from 'react-router'

export const meta = () => getPageMeta({ pageTitle: 'Vídeo' })

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params

  const video = api(`/videos/${id}`)
  const views = apiFetcher.patch(`/videos/${id}/views`).then((res) => res.data)

  return {
    video,
    views,
  }
}

export default function Video({ loaderData }: Route.ComponentProps) {
  const { video, views } = loaderData

  return (
    <Suspense fallback={null}>
      <Await resolve={video}>
        {(data) => (
          <div className="space-y-4">
            <iframe
              title="Panda video player"
              src={`${data.video_player}&muted=false&autoplay=true`}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
              allowFullScreen
              className="border-none w-full aspect-video rounded-lg"
            />
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-3/5 space-y-6">
                <div className="flex justify-between items-center gap-4">
                  <h2 className="text-xl font-bold">
                    {removeExtension(data.title)}
                  </h2>
                  <SaveButton videoId={data.id} />
                </div>

                <div className="flex justify-between gap-4">
                  <div>
                    <Text size="sm" c="dimmed">
                      <Await resolve={views}>{(views) => views || 1}</Await>{' '}
                      {`visualizações • ${dayjs(data.created_at).fromNow()}`}
                    </Text>
                  </div>

                  <FeedbackRow videoId={data.id} />
                </div>

                {data.description && (
                  <Card withBorder>
                    <Spoiler
                      maxHeight={80}
                      showLabel={<span className="text-sm">Ver mais</span>}
                      hideLabel={<span className="text-sm">Ver menos</span>}
                    >
                      <div className="[&_a]:text-blue-400 [&_a:hover]:underline text-sm">
                        {data.description}
                      </div>
                    </Spoiler>
                  </Card>
                )}

                <Comments videoId={data.id} />
              </div>

              <Divider orientation="vertical" />

              <div className="w-full lg:w-2/5 space-y-8">
                <h3 className="font-semibold">Mais vídeos</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {data.related.map((video: PandaVideo) => (
                    <VideoCard key={data.id} video={video} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  )
}
