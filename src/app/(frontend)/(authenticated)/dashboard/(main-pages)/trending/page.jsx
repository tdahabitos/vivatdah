"use client";

import { apiFetcher } from "@/services/api";
import { Skeleton } from "@mantine/core";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";
import Empty from "../../_components/Empty";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase/client";
import { IconFlame } from "@tabler/icons-react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);
  const [videos, setVideos] = useState([]);

  const { data: unsortedVideos } = useSWR("/videos", apiFetcher);

  async function getMetadata() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("videos")
      .select("*")
      .order("views", { ascending: false });

    if (!error) {
      setMetadata(data);
    }
  }

  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    if (unsortedVideos && metadata) {
      setVideos(
        metadata.map((video) =>
          unsortedVideos.find((v) => v.id === video.reference_id),
        ),
      );

      setIsLoading(false);
    }
  }, [unsortedVideos, metadata]);

  if (isLoading) {
    return <Skeleton w={350} h={35} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconFlame size={24} />
        <h2 className="text-2xl font-semibold">Mais populares</h2>
      </div>

      {videos?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
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
