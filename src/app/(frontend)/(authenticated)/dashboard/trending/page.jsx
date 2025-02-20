"use client";

import VideoCard from "../_components/VideoCard";
import Empty from "../_components/Empty";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase/client";
import { IconFlame } from "@tabler/icons-react";
import { apiFetcher } from "@/services/api";
import PageLoader from "../_components/PageLoader";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState([]);
  const [videos, setVideos] = useState([]);

  async function getMetadata() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("videos")
      .select("*")
      .limit(16)
      .order("views", { ascending: false });

    if (!error) {
      setMetadata(data);

      data.map(async (item) => {
        await apiFetcher(`/videos/${item?.reference_id}`).then((res) => {
          setVideos((prev) => [...prev, res]);
        });
      });
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
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconFlame size={24} />
        <h2 className="text-2xl font-semibold">Mais populares</h2>
      </div>

      {videos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metadata?.map((item) => {
            if (!videos.find((v) => v.id === item.reference_id)) return null;

            return <VideoCard key={item.id} id={item.reference_id} />;
          })}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
