"use client";

import { apiFetcher } from "@/services/api";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";

export default function Page() {
  const { slug } = useParams();

  const {
    data: videos,
    error,
    isLoading,
  } = useSWR(
    `/videos?where[categories.id][equals]=${slug}&limit=16&page=1`,
    apiFetcher,
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="flex flex-col gap-4">
            <Skeleton height={176} radius="md" />
            <div className="flex">
              <Skeleton height={20} width="100%" radius="sm" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton height={40} circle />
              <Skeleton height={16} width="50%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {videos?.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          url={video.url}
        />
      ))}
    </div>
  );
}
