import { useDisclosure } from "@mantine/hooks";
import { Button, Drawer } from "@mantine/core";
import { IconFolders } from "@tabler/icons-react";
import type { Media } from "~/types";
import FileCard from "~/components/file-card";
import Empty from "~/components/empty";

export default function FileList({ files }: { files: Media[] }) {
  const [opened, { open, close }] = useDisclosure(false);

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
        {files.length === 0 && <Empty />}

        <div className="space-y-4">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </Drawer>
    </>
  );
}
