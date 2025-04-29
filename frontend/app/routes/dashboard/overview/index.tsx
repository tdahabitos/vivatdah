import { apiFetcher } from "~/lib/api";
import type { Route } from "./+types";
import type { PandaVideo, View } from "~/types";
import VideoCard from "~/components/video-card";
import { getPageMeta } from "~/utils";

export const meta = () => getPageMeta({ pageTitle: "Home" });

export async function loader() {
  const newVideos = await apiFetcher(`/videos?page=1&limit=2`);
  const trendingList = await apiFetcher("/videos/list/trending?page=1&limit=4");

  const trendingVideos = await Promise.all(
    trendingList.map((video: View) => apiFetcher(`/videos/${video.video_id}`))
  );

  return {
    newVideos,
    trendingVideos,
  };
}

export default function Overview({ loaderData }: Route.ComponentProps) {
  const { newVideos, trendingVideos } = loaderData;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">Novidades</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {newVideos.map((video: PandaVideo) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">Mais populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
          {trendingVideos.map((video: PandaVideo) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
