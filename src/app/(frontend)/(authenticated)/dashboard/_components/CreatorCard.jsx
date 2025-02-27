import { apiFetcher } from "@/services/api";
import { Avatar, Group, Text } from "@mantine/core";
import useSWR from "swr";

export function CreatorCard({ creatorId }) {
  const {
    data: creator,
    error,
    isLoading,
  } = useSWR(`/users/${creatorId}`, apiFetcher);

  console.log(creator);
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={creator?.avatar} size={94} />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {creator?.role}
          </Text>

          <Text fz="lg" fw={500} mb={4}>
            {creator?.name}
          </Text>

          <Text fz="xs" c="dimmed" w="80%">
            {creator?.bio}
          </Text>
        </div>
      </Group>
    </div>
  );
}
