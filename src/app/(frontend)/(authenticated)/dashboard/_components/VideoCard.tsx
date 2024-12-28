import { getVideoThumbnail } from "@/utils";
import { ActionIcon, Avatar, Badge, Menu, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBroadcast,
  IconClock,
  IconGripVertical,
  IconPlaylistAdd,
  IconShare3,
} from "@tabler/icons-react";
import Link from "next/link";
import { dayjs } from "@/lib/dayjs";
import useSWR from "swr";
import { apiFetcher } from "@/services/api";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase/client";

export default function VideoCard({
  id,
}: {
  id: string;
}) {
  const soon = false;
  const live = false;
  const [videoMetadata, setVideoMetadata] = useState(null);

  const { data: video, error, isLoading } = useSWR(`/videos/${id}`, apiFetcher);

  const thumbnailURL = getVideoThumbnail({ url: video?.url });

  async function getMetadata() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("videos")
      .select("views")
      .eq("reference_id", id)
      .single();

    setVideoMetadata({
      views: data?.views,
    });
  }

  useEffect(() => {
    getMetadata();
  }, []);

  if (error) {
    return "error...";
  }

  if (isLoading) {
    return "loading...";
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Link href={`/dashboard/video/${id}`}>
          <img
            className="w-full rounded aspect-video object-cover"
            src={thumbnailURL}
            alt={video?.title}
          />
        </Link>
        {soon && (
          <Badge
            className="absolute bottom-4 right-4"
            leftSection={<IconClock size={14} />}
            color="gray"
          >
            Em breve
          </Badge>
        )}
        {live && (
          <Badge
            className="absolute bottom-4 right-4"
            leftSection={<IconBroadcast size={14} />}
            color="red"
          >
            Ao vivo
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <Link href={`/video/${id}`}>
            <Text fw="bolder">{video?.title}</Text>
          </Link>

          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconGripVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<IconPlaylistAdd size={18} />}>
                Adicionar a minha playlist
              </Menu.Item>
              <Menu.Item leftSection={<IconBookmark size={18} />}>
                Salvar
              </Menu.Item>
              <Menu.Item leftSection={<IconShare3 size={18} />}>
                Compartilhar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div>
          <Link
            href={`/dashboard/creator/${video?.creator.id}`}
            className="flex items-center gap-2 mb-1"
          >
            <div className="p-1 border-white/50 border-solid border rounded-full">
              <Avatar
                size="sm"
                src={`${process.env.NEXT_PUBLIC_APP_URL}/${video?.creator.avatar.url}`}
              />
            </div>
            <Text c="dimmed">{video?.creator.name}</Text>
          </Link>
          <Link href="/video/1">
            <Text size="sm" c="dimmed">
              {`${videoMetadata?.views || 0} visualizações • ${dayjs(video.createdAt).fromNow()}`}
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
