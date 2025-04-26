import { IconArrowLeftFromArc } from "@tabler/icons-react";
import Empty from "~/components/empty";
import VideoCard from "~/components/video-card";
import api from "~/lib/api";
import type { Category, PandaVideo } from "~/types";
import type { Route } from "./+types";
import { getFolderVideos } from "~/lib/panda-videos";
import { getPageMeta } from "~/utils";

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: "Conteúdo livre" });

export async function loader() {
  let videos: PandaVideo[] = [];

  const categories = await api({
    collection: "categories",
    where: {
      free_content: {
        equals: true,
      },
    },
  });

  await Promise.all(
    categories.map(async (category: Category) => {
      await getFolderVideos(category.panda_folder_id).then((res) => {
        videos = [...videos, ...res];
      });
    })
  );

  return {
    videos,
  };
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <IconArrowLeftFromArc size={24} />
          <h2 className="text-2xl font-semibold">Conteúdo livre</h2>
        </div>
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
