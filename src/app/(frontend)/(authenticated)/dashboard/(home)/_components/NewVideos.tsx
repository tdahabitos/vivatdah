import { apiFetcher } from "@/services/api";
import { supabase } from "@/services/supabase/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import VideoCard from "../../_components/VideoCard";

export default function NewVideos() {
  const [metadata, setMetadata] = useState(null);
  const [newVideos, setNewVideos] = useState([]);

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
    if (videos && metadata) {
      setNewVideos(
        metadata.map((video) =>
          videos.find((v) => v.id === video.reference_id),
        ),
      );
    }
  }, [videos, metadata]);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">Novidades</h2>

      <div className="flex gap-4">
        {newVideos?.map((video, index) => (
          <div key={video.id} className={index === 0 ? "w-2/5" : "flex-1"}>
            <VideoCard id={video.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
