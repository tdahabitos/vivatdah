import { Card } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";

export default function Empty() {
  return (
    <Card withBorder>
      <div className="flex justify-center items-center gap-2">
        <span>
          <IconInbox size={48} />
        </span>
        <span>Nenhum resultado encontrado</span>
      </div>
    </Card>
  );
}
