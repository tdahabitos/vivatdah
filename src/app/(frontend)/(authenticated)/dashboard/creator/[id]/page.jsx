"use client";

import { apiFetcher } from "@/services/api";
import { Divider } from "@mantine/core";
import { useParams } from "next/navigation";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";
import { CreatorCard } from "../../_components/CreatorCard";
import PageLoader from "../../_components/PageLoader";

export default function Page() {
  const { id } = useParams();

  const {
    data: videos,
    error,
    isLoading,
  } = useSWR(
    `/videos?where[creator.id][equals]=${id}&limit=16&page=1`,
    apiFetcher,
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-8">
      <CreatorCard creatorId={id} />

      <Divider />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos?.map((video) => (
          <VideoCard key={video.id} id={video.id} />
        ))}
      </div>
    </div>
  );
}
