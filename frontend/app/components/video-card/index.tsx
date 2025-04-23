import {
  ActionIcon,
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
  IconCheck,
  IconCopy,
  IconDotsVertical,
  IconShare3,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import type { PandaVideo } from "~/types";
import { Link } from "react-router";
import SaveButton from "./components/save-button";
import dayjs from "~/lib/dayjs";
import { getViews } from "~/lib/api";

export default function VideoCard({ video }: { video: PandaVideo }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [views, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchViews() {
    setIsLoading(true);

    await getViews(video.id)
      .then((res) => setViews(res))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchViews();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Link to={`/dashboard/video/${video.id}`}>
          <div className="overflow-hidden rounded">
            <Image
              className="w-full rounded aspect-video object-cover hover:scale-105 transition-all duration-300 ease-in-out"
              src={video.thumbnail}
              alt={video.title}
              fallbackSrc="/fallback-thumbnail.svg"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <Link to={`/dashboard/video/${video.id}`}>
              <h3 className="font-bold">{video?.title}</h3>
            </Link>

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <SaveButton videoId={video.id} />
                <Menu.Item
                  leftSection={<IconShare3 size={18} />}
                  onClick={open}
                >
                  Compartilhar
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <Text size="sm" c="dimmed">
            <div className="flex items-center gap-1">
              <span key={video.id}>
                {isLoading ? <Skeleton w={40} h={20} /> : views}{" "}
              </span>
              <span>
                {`visualizações • ${dayjs(video.created_at).fromNow()}`}
              </span>
            </div>
          </Text>
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
          <TextInput className="flex-1" value={`/video/${video.id}`} disabled />
          <CopyButton value={`/video/${video.id}`}>
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
