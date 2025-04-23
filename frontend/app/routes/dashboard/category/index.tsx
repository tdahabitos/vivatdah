import { IconArrowLeftFromArc } from "@tabler/icons-react";
import Empty from "~/components/empty";
import VideoCard from "~/components/video-card";
import api from "~/lib/api";
import type { PandaVideo } from "~/types";
import type { Route } from "./+types";
import { getFolderVideos } from "~/lib/panda-videos";
import FileList from "./components/file-list";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const category = await api({
    collection: "categories",
    where: {
      id: {
        equals: id,
      },
    },
  }).then((res) => res[0]);

  const videos = await getFolderVideos(category.panda_folder_id);

  const files = await api({
    collection: "media",
    where: {
      categories: {
        contains: id,
      },
    },
  });

  return {
    category,
    videos,
    files,
  };
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { category, videos, files } = loaderData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <IconArrowLeftFromArc size={24} />
          <h2 className="text-2xl font-semibold">{category?.title}</h2>
        </div>

        <FileList files={files} />
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
