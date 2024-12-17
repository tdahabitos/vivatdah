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
  Textarea,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowBigDownLines,
  IconBookmark,
  IconFileText,
  IconHeart,
  IconInfoCircle,
  IconMicrophoneFilled,
  IconNotebook,
  IconPhoto,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import { useState } from "react";
import useSWR from "swr";
import { CommentCard } from "./_components/CommentCard";
import { apiFetcher } from "@/services/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils";

export default function Video() {
  const [comment, setComment] = useState("");
  const { slug } = useParams();

  const {
    data: video,
    error,
    isLoading,
  } = useSWR(`/videos/${slug}`, apiFetcher);

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton width="50%" height={35} />
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

  const stats = "40K visualizações • há 10 dias";

  return (
    <div className="space-y-4">
      <iframe
        width="100%"
        height="450"
        className="w-full rounded-lg bg-white/10"
        src={video.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="flex gap-6">
        <div className="w-full lg:w-3/5 space-y-8">
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <div className="flex items-center gap-2">
              <ActionIcon variant="default">
                <IconHeart size={16} />
              </ActionIcon>
              <ActionIcon variant="default">
                <IconBookmark size={16} />
              </ActionIcon>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div>
              <Link
                href={`/creator/${video.creator.id}`}
                className="flex gap-2 mb-1"
              >
                <div className="p-1 border-white/50 border-solid border rounded-full">
                  <Avatar
                    size="xs"
                    src={`${process.env.NEXT_PUBLIC_APP_URL}/${video.creator.avatar.url}`}
                  />
                </div>
                <Text c="dimmed">{video.creator.name}</Text>
              </Link>
              <Link href="/video/1">
                <Text size="sm" c="dimmed">
                  {stats}
                </Text>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ActionIcon>
                  <IconThumbUp size={16} />
                </ActionIcon>
                <span className="text-xs">301</span>
              </div>
              <ActionIcon variant="light">
                <IconThumbDown size={16} />
              </ActionIcon>
            </div>
          </div>

          <Card withBorder>
            <div className="flex items-center gap-2 mb-4">
              <IconArrowBigDownLines size={18} />
              <h3 className="text-xl font-semibold">
                Arquivos relacionados para download
              </h3>
            </div>

            <div className="flex flex-wrap gap-4">
              {video.files?.map((file) => {
                let icon: React.ReactNode;
                let color: string;

                switch (file?.mimeType) {
                  case "application/pdf":
                    icon = <IconFileText />;
                    color = "red";
                    break;
                  case "image/jpeg":
                    icon = <IconPhoto />;
                    color = "violet";
                    break;
                  case "application/epub+zip":
                    icon = <IconNotebook />;
                    color = "teal";
                    break;
                  case "audio/mpeg":
                    icon = <IconMicrophoneFilled />;
                    color = "blue";
                    break;
                  default:
                    icon = <IconFileText />;
                    color = "red";
                    break;
                }

                return (
                  <Button
                    key={file?.id}
                    component={Link}
                    href={`${process.env.NEXT_PUBLIC_APP_URL}${file.url}`}
                    target="_blank"
                    variant="light"
                    color={color}
                    leftSection={icon}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{file?.filename}</span>

                      <Badge size="xs" color={color}>
                        {file?.mimeType.split("/")[1]}
                      </Badge>
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>

          <h3 className="text-2xl font-semibold">Comentários</h3>

          <div className="space-y-2">
            <Textarea
              leftSection={
                <div className="p-1 border-white/50 border-solid border rounded-full">
                  <Avatar size="sm" src="https://i.pravatar.cc/300" />
                </div>
              }
              onChange={(e) => setComment(e.target.value)}
              autosize
              minRows={2}
              leftSectionWidth={55}
              placeholder="Adicione um comentário"
            />
            <div
              className={cn(
                "hidden justify-between gap-2",
                comment !== "" && "flex",
              )}
            >
              <Tooltip
                label="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                position="top-start"
              >
                <div className="flex items-center gap-1 opacity-50">
                  <IconInfoCircle size={18} />
                  <span className="text-xs">Regras gerais</span>
                </div>
              </Tooltip>
              <div className="flex gap-2">
                <Button variant="light" size="xs">
                  Cancelar
                </Button>
                <Button size="xs">Comentar</Button>
              </div>
            </div>
          </div>

          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
        <Divider orientation="vertical" />
        <div className="w-full lg:w-2/5 space-y-8">
          <h3 className="font-semibold">Mais vídeos</h3>
          {/* <VideoCard id={data?.video.documentId} /> */}
        </div>
      </div>
    </div>
  );
}
