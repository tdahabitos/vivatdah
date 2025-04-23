import { Button, Card, Group, Image, Text } from "@mantine/core";
import { Link } from "react-router";
import type { Category } from "~/types";

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {categories.map((category) => (
        <Card key={category.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={`${import.meta.env.VITE_STORAGE_URL}/${category.cover.url}`}
              height={160}
              alt={category.title}
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{category.title} </Text>
          </Group>

          <Text size="sm" c="dimmed" mb="md">
            {category.description}
          </Text>

          <Button
            component={Link}
            to="/assinatura"
            fullWidth
            mt="auto"
            radius="md"
          >
            Iniciar agora
          </Button>
        </Card>
      ))}
    </div>
  );
}
