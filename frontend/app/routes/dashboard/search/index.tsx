import { IconSearch } from "@tabler/icons-react";
import VideoCard from "~/components/video-card";
import FileCard from "~/components/file-card";
import Empty from "~/components/empty";
import type { Route } from "./+types";
import type { Media, PandaVideo } from "~/types";
import { Divider } from "@mantine/core";
import { cn, getPageMeta } from "~/utils";
import type { P } from "node_modules/react-router/dist/development/route-data-OcOrqK13.mjs";

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: `Pesquisa | "${data.value}"` });

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const value = url.searchParams.get("value");

  /* const videos = value ? await searchVideos(value) : [];

  const files = await api({
    collection: "media",
    where: {
      title: {
        contains: value,
      },
      is_public: {
        equals: true,
      },
    },
  }); */
  //TODO: Add files

  return { value, videos: [], files: [] };
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { value, files, videos } = loaderData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconSearch size={24} />
        <h2 className="text-2xl font-semibold">Pesquisa - "{value}"</h2>
      </div>

      {videos?.length === 0 && files?.length === 0 && <Empty />}

      <div className={cn(videos.length === 0 && "hidden")}>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Vídeos</h2>
          <Divider />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video: PandaVideo) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      <div className={cn(files.length === 0 && "hidden")}>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Arquivos</h2>
          <Divider />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {files.map((file: Media) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
