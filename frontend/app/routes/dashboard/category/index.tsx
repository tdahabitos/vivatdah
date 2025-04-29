import { IconArrowLeftFromArc } from "@tabler/icons-react";
import Empty from "~/components/empty";
import VideoCard from "~/components/video-card";
import { apiFetcher } from "~/lib/api";
import type { PandaVideo } from "~/types";
import type { Route } from "./+types";
import FileList from "./components/file-list";
import { useUser } from "~/store/user-store";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPageMeta } from "~/utils";

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: data.category.title });

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const category = await apiFetcher(`/categories/${id}`);
  const videos = await apiFetcher(`/videos?folder_id=${id}`);

  /* const files = await api({
    collection: "media",
    where: {
      categories: {
        contains: id,
      },
    },
  }); */
  // TODO: Add files

  return {
    category,
    videos,
    files: [],
  };
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { category, videos, files } = loaderData;
  const { allowedCategories } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  function checkAccess() {
    if (!allowedCategories) return;

    if (allowedCategories.includes(category.id)) {
      setHasAccess(true);
      return;
    }

    navigate(`/${import.meta.env.VITE_PLANS_PAGE_PATH}`);
  }

  useEffect(() => {
    checkAccess();
  }, [allowedCategories]);

  if (!hasAccess) return null;

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
