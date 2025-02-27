import useSWR from "swr";
import { apiFetcher } from "@/services/api";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Drawer,
  Group,
  Pagination,
  Text,
} from "@mantine/core";
import {
  IconDownload,
  IconFileStack,
  IconFolders,
  IconMicrophoneFilled,
  IconPhoto,
} from "@tabler/icons-react";
import Empty from "./Empty";

export default function FileList({ categoryId }) {
  const [opened, { open, close }] = useDisclosure(false);

  const limit = 16;
  const [activePage, setActivePage] = useState(1);

  const { data: files } = useSWR(
    `/media/?where[categories][contains]=${categoryId}&limit=${limit}&page=${activePage}`,
    (url) => apiFetcher(url, false),
  );

  return (
    <>
      <Button
        leftSection={<IconFolders size={16} />}
        variant="light"
        onClick={open}
      >
        Arquivos
      </Button>

      <Drawer opened={opened} onClose={close} title="Arquivos" position="right">
        {files?.docs?.length === 0 ? (
          <div className="w-full">
            <Empty />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {files?.docs?.map((file) => {
                let icon;
                let color;

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
                        {file?.title}
                      </Text>
                      <Badge size="xs" color={color}>
                        {file?.mimeType.split("/")[1]}
                      </Badge>
                    </Group>

                    <Button
                      component={Link}
                      href={`${process.env.NEXT_PUBLIC_APP_URL}${file.url}`}
                      target="_blank"
                      download={`${file.title}.${file.mimeType.split("/")[1]}`}
                      leftSection={<IconDownload size={16} />}
                    >
                      Baixar
                    </Button>
                  </Card>
                );
              })}
            </div>
            <div className="flex justify-center md:justify-end items-center gap-4 mt-8">
              <div className="hidden md:flex items-center gap-1 text-sm">
                <span className="font-bold">{files?.totalDocs}</span>
                <span>
                  {files?.totalDocs > 1
                    ? "resultados encontrados"
                    : "resultado encontrado"}
                </span>
              </div>
              <Pagination
                className="!mt-0"
                total={files?.totalPages}
                value={activePage}
                onChange={setActivePage}
                mt="sm"
              />
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
