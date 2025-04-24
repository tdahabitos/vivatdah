import { IconArrowLeftFromArc } from "@tabler/icons-react";
import Empty from "~/components/empty";
import VideoCard from "~/components/video-card";
import api from "~/lib/api";
import type { PandaVideo, View } from "~/types";
import type { Route } from "./+types";
import { getVideo } from "~/lib/panda-videos";
import { getPageMeta } from "~/utils";

export const meta = () => getPageMeta({ pageTitle: "Mais populares" });

export async function loader({ params }: Route.LoaderArgs) {
  const trendingList = await api({
    collection: "views",
    sort: "-views",
    limit: 16,
  });

  const videos = await Promise.all(
    trendingList.map((video: View) => getVideo(video.video_id))
  );

  return {
    videos,
  };
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconArrowLeftFromArc size={24} />
        <h2 className="text-2xl font-semibold">Trending</h2>
      </div>

      {videos.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 space-y-6">
          {videos.map((video: PandaVideo) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
