import { Text, Avatar, Group, ActionIcon } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";

export function CommentCard() {
  return (
    <div>
      <Group>
        <div className="p-1 border-white/50 border-solid border rounded-full">
          <Avatar size="sm" src="https://i.pravatar.cc/300" />
        </div>
        <div>
          <Text size="sm">Jacob Warnhalter</Text>
          <Text size="xs" c="dimmed">
            10 minutes ago
          </Text>
        </div>
      </Group>
      <Text pl={56} pt="sm" size="sm">
        This Pokémon likes to lick its palms that are sweetened by being soaked
        in honey. Teddiursa concocts its own honey by blending fruits and pollen
        collected by Beedrill. Blastoise has water spouts that protrude from its
        shell. The water spouts are very accurate.
      </Text>
      <div className="flex pl-14 mt-4 gap-4">
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
  );
}
