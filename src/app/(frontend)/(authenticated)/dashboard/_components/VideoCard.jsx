import { getVideoThumbnail } from "@/utils";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  CopyButton,
  Image,
  Menu,
  Modal,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconBroadcast,
  IconCheck,
  IconClock,
  IconCopy,
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconShare3,
} from "@tabler/icons-react";
import Link from "next/link";
import { dayjs } from "@/lib/dayjs";
import useSWR from "swr";
import { apiFetcher } from "@/services/api";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase/client";
import { useDisclosure } from "@mantine/hooks";
import useFavorite from "@/hooks/useFavorite";
import useSave from "@/hooks/useSave";

export default function VideoCard({ id }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const { isFavorited, toggle: favoriteToggle } = useFavorite(id);
  const { isSaved, toggle: saveToggle } = useSave(id);

  const { data: video, error, isLoading } = useSWR(`/videos/${id}`, apiFetcher);

  const thumbnailURL = getVideoThumbnail({
    platform: video?.platform,
    url: video?.url,
  });

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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton height={176} radius="md" />
        <div className="flex">
          <Skeleton height={20} width="100%" radius="sm" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton height={40} circle />
          <Skeleton height={16} width="50%" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Link href={`/dashboard/video/${id}`}>
            <div className="overflow-hidden rounded">
              <Image
                className="w-full rounded aspect-video object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                src={thumbnailURL || "/thumbnail-fallback.webp"}
                alt={video?.title}
              />
            </div>
          </Link>
          {video?.status === "soon" && (
            <Badge
              className="absolute bottom-4 right-4"
              leftSection={<IconClock size={14} />}
              color="gray"
            >
              Em breve
            </Badge>
          )}
          {video?.status === "live" && (
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
              <h3 className="font-bold">{video?.title}</h3>
            </Link>

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Opções</Menu.Label>
                <Menu.Item
                  closeMenuOnClick={false}
                  leftSection={
                    isFavorited ? (
                      <IconHeartFilled size={18} color="red" />
                    ) : (
                      <IconHeart size={18} />
                    )
                  }
                  onClick={favoriteToggle}
                >
                  {isFavorited
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"}
                </Menu.Item>
                <Menu.Item
                  closeMenuOnClick={false}
                  leftSection={
                    isSaved ? (
                      <IconBookmarkFilled size={18} color="violet" />
                    ) : (
                      <IconBookmark size={18} />
                    )
                  }
                  onClick={saveToggle}
                >
                  {isSaved ? "Remover dos salvos" : "Adicionar aos salvos"}
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconShare3 size={18} />}
                  onClick={open}
                >
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
            <Text size="sm" c="dimmed">
              {`${videoMetadata?.views || 0} visualizações • ${dayjs(video?.createdAt).fromNow()}`}
            </Text>
          </div>
        </div>
      </div>

      <Modal
        centered
        opened={opened}
        onClose={close}
        title={
          <div className="flex items-center gap-2">
            <IconShare3 size={18} />
            <span>Compartilhar</span>
          </div>
        }
        size="lg"
      >
        <div className="w-full flex gap-2 px-[10%]">
          <TextInput className="flex-1" value={`/video/${id}`} disabled />
          <CopyButton value={`/video/${id}`}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {copied ? <IconCheck /> : <IconCopy />}
              </Button>
            )}
          </CopyButton>
        </div>
      </Modal>
    </>
  );
}
