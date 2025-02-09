"use client";

import { apiFetcher } from "@/services/api";
import useSWR from "swr";
import VideoCard from "../_components/VideoCard";
import Empty from "../_components/Empty";
import { IconBroadcast } from "@tabler/icons-react";
import PageLoader from "../_components/PageLoader";

export default function Page() {
  const { data: videos, isLoading } = useSWR(
    "/videos?where[status][equals]=live&limit=16&page=1",
    apiFetcher,
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconBroadcast size={24} />
        <h2 className="text-2xl font-semibold">Ao vivo</h2>
      </div>

      {videos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos?.map((video) => (
            <VideoCard key={video.id} id={video.id} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
