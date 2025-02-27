"use client";

import { apiFetcher } from "@/services/api";
import { Divider, Pagination } from "@mantine/core";
import { useParams } from "next/navigation";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";
import { CreatorCard } from "../../_components/CreatorCard";
import PageLoader from "../../_components/PageLoader";
import { useState } from "react";

export default function Page() {
  const { id } = useParams();
  const limit = 16;
  const [activePage, setActivePage] = useState(1);

  const {
    data: videos,
    error,
    isLoading,
  } = useSWR(
    `/videos?where[creator.id][equals]=${id}&limit=${limit}&page=${activePage}`,
    (url) => apiFetcher(url, false),
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-8">
      <CreatorCard creatorId={id} />

      <Divider />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos?.docs?.map((video) => (
          <VideoCard key={video.id} id={video.id} />
        ))}
      </div>

      <div className="flex justify-center md:justify-end items-center gap-4 mt-8">
        <div className="hidden md:flex items-center gap-1 text-sm">
          <span className="font-bold">{videos?.totalDocs}</span>
          <span>
            {videos?.totalDocs > 1
              ? "resultados encontrados"
              : "resultado encontrado"}
          </span>
        </div>
        <Pagination
          className="!mt-0"
          total={videos?.totalPages}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
        />
      </div>
    </div>
  );
}
