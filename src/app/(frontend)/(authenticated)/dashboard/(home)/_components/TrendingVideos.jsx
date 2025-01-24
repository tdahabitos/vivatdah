import { apiFetcher } from "@/services/api";
import { supabase } from "@/services/supabase/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";

export default function TrendingVideos() {
  const [metadata, setMetadata] = useState(null);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const { data: videos } = useSWR("/videos", apiFetcher);

  async function getMetadata() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("videos")
      .select("*")
      .limit(4)
      .order("views", { ascending: false });

    if (!error) {
      setMetadata(data);
    }
  }

  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    if (videos && metadata) {
      setTrendingVideos(
        metadata.map((video) =>
          videos.find((v) => v.id === video.reference_id),
        ),
      );
    }
  }, [videos, metadata]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mais vistos</h2>
      <div className="grid grid-cols-4 gap-4">
        {trendingVideos?.map((video) => (
          <VideoCard key={video.id} id={video.id} />
        ))}
      </div>
    </div>
  );
}
