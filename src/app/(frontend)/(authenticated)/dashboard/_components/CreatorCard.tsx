import { apiFetcher } from "@/services/api";
import { Avatar, Group, Text } from "@mantine/core";
import useSWR from "swr";

export function CreatorCard({ creatorId }: { creatorId: string }) {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`/users/${creatorId}`, apiFetcher);

  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {user?.role}
          </Text>

          <Text fz="lg" fw={500} mb={4}>
            {user?.name}
          </Text>

          <Text fz="xs" c="dimmed" w="80%">
            {user?.bio}
          </Text>
        </div>
      </Group>
    </div>
  );
}
