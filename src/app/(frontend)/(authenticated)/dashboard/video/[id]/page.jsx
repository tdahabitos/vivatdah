"use client";

import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Skeleton,
  Text,
} from "@mantine/core";
import {
  IconArrowBigDownLines,
  IconBookmark,
  IconBookmarkFilled,
  IconFileStack,
  IconHeart,
  IconHeartFilled,
  IconMicrophoneFilled,
  IconPhoto,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiFetcher } from "@/services/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import VideoCard from "../../_components/VideoCard";
import { dayjs } from "@/lib/dayjs";
import ReactPlayer from "react-player";
import { supabase } from "@/services/supabase/client";
import useFavorite from "@/hooks/useFavorite";
import useSave from "@/hooks/useSave";
import Comments from "./_components/Comments";
import VideoFeedback from "./_components/VideoFeedback";

export default function Video() {
  const { id } = useParams();

  console.log(id);

  const [videoMetadata, setVideoMetadata] = useState(null);
  const { isFavorited, toggle: favoriteToggle } = useFavorite(id);
  const { isSaved, toggle: saveToggle } = useSave(id);

  const { data: video, error, isLoading } = useSWR(`/videos/${id}`, apiFetcher);

  const categoryId = video?.categories[0].id;

  const { data: moreVideos } = useSWR(
    `/videos?where[categories.id][equals]=${categoryId}&limit=16&page=1`,
    apiFetcher,
  );

  async function addView(currentViews) {
    await supabase
      .schema("metadata")
      .from("videos")
      .update({ views: currentViews })
      .eq("reference_id", id);
  }

  async function getMetadata() {
    const { data, error } = await supabase
      .schema("metadata")
      .from("videos")
      .select("views")
      .eq("reference_id", id)
      .single();

    if (error) {
      await supabase
        .schema("metadata")
        .from("videos")
        .insert({ reference_id: id });
    }

    const currentViews = (data?.views || 0) + 1;

    addView(currentViews);

    setVideoMetadata({
      views: currentViews,
    });
  }

  useEffect(() => {
    getMetadata();
  }, []);

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton height={450} />
        <div className="flex gap-4">
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <Skeleton height={80} />
            <Skeleton height={60} />
            <Skeleton height={40} />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <Skeleton height={80} />
            <Skeleton height={60} />
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      {video?.platform === "panda" && (
        <iframe
          title="Panda video player"
          src={`${video?.url}&muted=false&autoplay=true`}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
          allowfullscreen="true"
          fetchpriority="high"
          className="border-none w-full h-[450px] rounded-lg"
        />
      )}

      {video?.platform === "youtube" && (
        <iframe
          width="auto"
          height="450"
          src={`https://www.youtube.com/embed/${video?.url?.split("v=")[1]}?&autoplay=1`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="border-none w-full h-[450px] rounded-lg"
        />
      )}

      <div className="flex gap-6">
        <div className="w-full lg:w-3/5 space-y-8">
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-xl font-bold">{video.title}</h2>
            <div className="flex items-center gap-2">
              <ActionIcon variant="default" onClick={favoriteToggle}>
                {isFavorited ? (
                  <IconHeartFilled size={16} color="red" />
                ) : (
                  <IconHeart size={16} />
                )}
              </ActionIcon>
              <ActionIcon variant="default" onClick={saveToggle}>
                {isSaved ? (
                  <IconBookmarkFilled size={16} color="violet" />
                ) : (
                  <IconBookmark size={16} />
                )}
              </ActionIcon>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <Link
                href={`/dashboard/creator/${video.creator.id}`}
                className="flex items-center gap-2 mb-1"
              >
                <div className="p-1 border-white/50 border-solid border rounded-full">
                  <Avatar
                    size="sm"
                    src={`${process.env.NEXT_PUBLIC_APP_URL}/${video?.creator?.avatar?.url}`}
                  />
                </div>
                <Text c="dimmed">{video?.creator?.name}</Text>
              </Link>
              <Link href="/video/1">
                <Text size="sm" c="dimmed">
                  {`${videoMetadata?.views || 0} visualizações • ${dayjs(video.createdAt).fromNow()}`}
                </Text>
              </Link>
            </div>

            <VideoFeedback />
          </div>

          {video?.files?.length > 0 && (
            <Card withBorder>
              <div className="flex items-center gap-2 mb-4">
                <IconArrowBigDownLines size={18} />
                <h3 className="text-xl font-semibold">
                  Arquivos disponíveis para download
                </h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {video.files?.map((file) => {
                  let icon;
                  let color;

                  switch (file?.mimeType) {
                    case "image/jpeg":
                    case "image/png":
                    case "image/gif":
                    case "image/webp":
                    case "image/svg+xml":
                      icon = <IconPhoto />;
                      color = "violet";
                      break;

                    case "audio/mpeg":
                    case "audio/ogg":
                    case "audio/wav":
                    case "audio/aac":
                      icon = <IconMicrophoneFilled />;
                      color = "blue";
                      break;

                    default:
                      icon = <IconFileStack />;
                      color = "teal";
                      break;
                  }

                  return (
                    <Button
                      key={file?.id}
                      component={Link}
                      download={true}
                      href={`${process.env.NEXT_PUBLIC_APP_URL}${file.url}`}
                      target="_blank"
                      variant="light"
                      color={color}
                      leftSection={icon}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{file?.alt}</span>

                        <Badge size="xs" color={color}>
                          {file?.mimeType.split("/")[1]}
                        </Badge>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </Card>
          )}

          <Comments />
        </div>
        <Divider orientation="vertical" />
        <div className="w-full lg:w-2/5 space-y-8">
          <h3 className="font-semibold">Mais vídeos</h3>
          {moreVideos
            ?.filter((item) => item.id !== video.id)
            .map((video) => (
              <VideoCard key={video.id} id={video.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
