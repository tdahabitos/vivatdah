import { ActionIcon, Badge, Menu, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBroadcast,
  IconClock,
  IconGripVertical,
  IconPlaylistAdd,
  IconShare3,
} from "@tabler/icons-react";
import Link from "next/link";

function getThumbnail({ platform, url }: { platform: string; url: string }) {
  let thumbnail = null;

  if (platform === "youtube") {
    const id = url?.split("https://www.youtube.com/embed/")[1];
    thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }

  if (platform === "vimeo") {
    const id = url?.split("https://player.vimeo.com/video/")[1];
    thumbnail = `https://i.vimeocdn.com/video/${id}_640.jpg`;
  }

  return thumbnail;
}

export default function VideoCard({
  id,
  title,
  url,
  soon,
  live,
}: {
  id: string;
  title: string;
  url: string;
  soon?: boolean;
  live?: boolean;
}) {
  let stats = "40K visualizações • há 10 dias";

  if (soon) {
    stats = "Programado para 18/11/2024, 23:00";
  }

  if (live) {
    stats = "10 mil assistindo";
  }

  const thumbnailURL = getThumbnail({ platform: "youtube", url });

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Link href={`/dashboard/video/${id}`}>
          <img
            className="w-full rounded aspect-video object-cover"
            src={thumbnailURL}
            alt=""
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
            <Text fw="bolder">{title}</Text>
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
          {/* <Link
            to={`/author/${data?.video.author.documentId}`}
            className="flex gap-2 mb-1"
          >
            <div className="p-1 border-white/50 border-solid border rounded-full">
              <Avatar
                size="xs"
                src={`${import.meta.env.VITE_APP_ADMIN_URL}/${data?.video.author.avatar.url}`}
              />
            </div>
            <Text c="dimmed">{data?.video.author.name}</Text>
          </Link> */}
          <Link href="/video/1">
            <Text size="sm" c="dimmed">
              {stats}
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
