"use client";

import { Skeleton } from "@mantine/core";
import VideoCard from "../../_components/VideoCard";
import Empty from "../../_components/Empty";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase/client";
import { useUserStore } from "@/store/userStore";
import { IconBookmark } from "@tabler/icons-react";

export default function Page() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  async function getVideos() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("events")
      .select("*")
      .eq("event", "save")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setVideos(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;

    getVideos();
  }, [user]);

  if (isLoading) {
    return <Skeleton w={350} h={35} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconBookmark size={24} />
        <h2 className="text-2xl font-semibold">Salvos</h2>
      </div>

      {videos?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {videos?.map((video) => (
            <VideoCard key={video.id} id={video.reference_id} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
