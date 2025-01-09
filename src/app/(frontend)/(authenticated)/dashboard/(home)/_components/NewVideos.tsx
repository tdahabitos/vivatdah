import { apiFetcher } from "@/services/api";
import { supabase } from "@/services/supabase/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";
import { Skeleton } from "@mantine/core";

export default function NewVideos() {
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState([]);

  const { data: videos } = useSWR("/videos", apiFetcher);

  async function getMetadata() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("videos")
      .select("*")
      .limit(2)
      .order("created_at", { ascending: true });

    if (!error) {
      setMetadata(data);
    }
  }

  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    if (videos?.length > 0 && metadata?.length > 0) {
      setIsLoading(false);
    }
  }, [videos, metadata]);

  if (isLoading) {
    return <Skeleton w={350} h={35} />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">Novidades</h2>

      <div className="flex gap-4">
        {metadata?.map((item, index) => {
          if (!videos.find((v) => v?.id === item?.reference_id)) return null;

          return (
            <div key={item?.id} className={index === 0 ? "w-2/5" : "flex-1"}>
              <VideoCard id={item?.reference_id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
