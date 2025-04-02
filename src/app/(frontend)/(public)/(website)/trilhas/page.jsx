'use client'

import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import Link from 'next/link'

export default function TrilhasPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Trilhas</h1>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://conintdah.com/wp-content/uploads/2025/01/brain-2-1536x1138.webp"
                height={160}
                alt="Conin 6"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Conin 6</Text>
              <Badge color="green">Já disponível</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Um Evento Feito para Você: estratégias Simples, acolhimento e soluções baseadas em
              Evidências Científicas para transformações reais.
            </Text>

            <Button component={Link} href="/assinatura" fullWidth mt="md" radius="md">
              Iniciar agora
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
