import { Card, Divider, Spoiler, Text } from "@mantine/core";
import type { Route } from "./+types";
import VideoCard from "~/components/video-card";
import { apiFetcher } from "~/lib/api";
import dayjs from "~/lib/dayjs";
import FeedbackRow from "./components/feedback-row";
import Comments from "./components/comments";
import SaveButton from "./components/save-button";
import { getPageMeta } from "~/utils";
import type { PandaVideo } from "~/types";

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: data.video.title });

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const video = await apiFetcher(`/videos/${id}`);
  const views = 0; // TODO: add views

  /* if (video.related.length === 0) {
    video.related = await getVideos(null, 1, 6);
  } */

  return {
    video,
    views,
  };
}

export default function Video({ loaderData }: Route.ComponentProps) {
  const { video, views } = loaderData;

  return (
    <div className="space-y-4">
      <iframe
        title="Panda video player"
        src={`${video.video_player}&muted=false&autoplay=true`}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
        allowFullScreen
        className="border-none w-full aspect-video rounded-lg"
      />

      <div className="flex gap-6">
        <div className="w-full lg:w-3/5 space-y-6">
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-xl font-bold">{video.title}</h2>
            <SaveButton videoId={video.id} />
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <Text size="sm" c="dimmed">
                {`${views} visualizações • ${dayjs(
                  video.created_at
                ).fromNow()}`}
              </Text>
            </div>

            <FeedbackRow videoId={video.id} />
          </div>

          {video.description && (
            <Card withBorder>
              <Spoiler
                maxHeight={80}
                showLabel={<span className="text-sm">Ver mais</span>}
                hideLabel={<span className="text-sm">Ver menos</span>}
              >
                <div className="[&_a]:text-blue-400 [&_a:hover]:underline text-sm">
                  {video.description}
                </div>
              </Spoiler>
            </Card>
          )}

          <Comments videoId={video.id} />
        </div>

        <Divider orientation="vertical" />

        <div className="w-full lg:w-2/5 space-y-8">
          <h3 className="font-semibold">Mais vídeos</h3>
          {video?.related.map((video: PandaVideo) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
