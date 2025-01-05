"use client";

import {
  IconDownload,
  IconFileStack,
  IconMicrophoneFilled,
  IconPhoto,
  IconSearch,
} from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Empty from "../_components/Empty";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Skeleton,
  Text,
} from "@mantine/core";
import GeneralSearch from "../_components/GeneralSearch";
import Link from "next/link";
import VideoCard from "../_components/VideoCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const value = searchParams.get("value");
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);

  async function handleSearch() {
    setIsLoading(true);

    await axios
      .get(`/api/media?where[filename][contains]=${value}`)
      .then((res) => setFiles(res.data.docs))
      .catch((err) => console.log(err));

    await axios
      .get(`/api/videos?where[title][contains]=${value}`)
      .then((res) => setVideos(res.data.docs))
      .catch((err) => console.log(err));

    setIsLoading(false);
  }

  useEffect(() => {
    handleSearch();
  }, [value]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton w={350} h={35} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="flex flex-col gap-4">
              <Skeleton height={176} radius="md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <IconSearch size={24} />
        <h2 className="text-2xl font-semibold">Pesquisa - "{value}"</h2>
      </div>

      {files?.length === 0 && videos?.length === 0 ? (
        <div className="space-y-4">
          <Empty />
          <div className="flex items-center gap-4 px-[15%]">
            <h3>Fazer uma nova pesquisa:</h3>
            <GeneralSearch />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos?.map((video) => (
            <VideoCard key={video.id} id={video.id} />
          ))}

          {files?.map((file) => {
            let icon: React.ReactNode;
            let color: string;

            switch (file?.mimeType) {
              case "image/jpeg":
              case "image/png":
              case "image/gif":
              case "image/webp":
              case "image/svg+xml":
                icon = <IconPhoto size={48} />;
                color = "violet";
                break;

              case "audio/mpeg":
              case "audio/ogg":
              case "audio/wav":
              case "audio/aac":
                icon = <IconMicrophoneFilled size={48} />;
                color = "blue";
                break;

              default:
                icon = <IconFileStack size={48} />;
                color = "teal";
                break;
            }

            return (
              <Card
                key={file.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section>
                  <div
                    color="teal"
                    className="w-full h-40 flex items-center justify-center"
                  >
                    {icon}
                  </div>
                </Card.Section>

                <Divider />

                <Group justify="space-between" my="md">
                  <Text fz={14} fw={500}>
                    {file?.filename}
                  </Text>
                  <Badge size="xs" color={color}>
                    {file?.mimeType.split("/")[1]}
                  </Badge>
                </Group>

                <Button
                  component={Link}
                  href={`${process.env.NEXT_PUBLIC_APP_URL}${file.url}`}
                  download={true}
                  leftSection={<IconDownload size={16} />}
                >
                  Baixar
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
