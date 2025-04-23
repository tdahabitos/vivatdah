import { Badge, Button, Card, Divider, Group, Text } from "@mantine/core";
import {
  IconDownload,
  IconFileStack,
  IconMicrophoneFilled,
  IconPhoto,
} from "@tabler/icons-react";
import { Link } from "react-router";
import type { Media } from "~/types";

export default function FileCard({ file }: { file: Media }) {
  let icon = null;
  let color = null;
  let mimeType = null;

  switch (file?.mimeType) {
    case "image/jpeg":
    case "image/png":
    case "image/gif":
    case "image/webp":
    case "image/svg+xml":
      icon = <IconPhoto size={48} />;
      color = "violet";
      mimeType = "Imagem";
      break;

    case "audio/mpeg":
    case "audio/ogg":
    case "audio/wav":
    case "audio/aac":
      icon = <IconMicrophoneFilled size={48} />;
      color = "blue";
      mimeType = "Áudio";
      break;

    default:
      icon = <IconFileStack size={48} />;
      color = "teal";
      mimeType = "Arquivo";
      break;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
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
          {mimeType}
        </Badge>
      </Group>

      <Button
        leftSection={<IconDownload size={16} />}
        component={Link}
        to={`${import.meta.env.VITE_STORAGE_URL}/${file.url}`}
        target="_blank"
      >
        Baixar
      </Button>
    </Card>
  );
}
