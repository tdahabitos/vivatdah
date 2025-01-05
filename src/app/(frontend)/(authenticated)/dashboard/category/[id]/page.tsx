"use client";

import { apiFetcher } from "@/services/api";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";
import Empty from "../../_components/Empty";
import { IconArrowLeftFromArc } from "@tabler/icons-react";

export default function Page() {
  const { id } = useParams();

  const { data: category } = useSWR(`/categories/${id}`, apiFetcher);

  const {
    data: videos,
    error,
    isLoading,
  } = useSWR(
    `/videos?where[categories.id][equals]=${id}&limit=16&page=1`,
    apiFetcher,
  );

  if (isLoading) {
    return <Skeleton w={350} h={35} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconArrowLeftFromArc size={24} />
        <h2 className="text-2xl font-semibold">{category?.title}</h2>
      </div>

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
