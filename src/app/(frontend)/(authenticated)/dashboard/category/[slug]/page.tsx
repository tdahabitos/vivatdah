"use client";

import { apiFetcher } from "@/services/api";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";
import Empty from "../../_components/Empty";

export default function Page() {
  const { slug } = useParams();

  const { data: category } = useSWR(`/categories/${slug}`, apiFetcher);

  const {
    data: videos,
    error,
    isLoading,
  } = useSWR(
    `/videos?where[categories.id][equals]=${slug}&limit=16&page=1`,
    apiFetcher,
  );

  if (isLoading) {
    return <Skeleton w={350} h={35} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">{category?.title}</h2>
      {videos?.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {videos?.map((video) => (
            <VideoCard key={video.id} id={video.id} />
          ))}
        </div>
      )}
    </div>
  );
}
