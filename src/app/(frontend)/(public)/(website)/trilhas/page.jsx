'use client'

import { apiFetcher } from '@/services/api'
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TrilhasPage() {
  const [categories, setCategories] = useState([])

  async function getCategories() {
    setCategories(await apiFetcher('/categories'))
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Trilhas</h1>

      <p>
        As trilhas da Viva TDAH foram pensadas para facilitar sua jornada de aprendizado. Cada
        trilha reúne conteúdos organizados por temas ou níveis de conhecimento, permitindo que você
        avance no seu tempo e de forma estruturada. Desde os primeiros passos até temas mais
        aprofundados, você escolhe por onde começar.
      </p>

      <p>
        Se você está buscando entender o que é TDAH, como ele se manifesta e quais são suas
        implicações no cotidiano, temos trilhas introdutórias que abordam os fundamentos com
        linguagem clara e objetiva. Já quem deseja ir além pode explorar trilhas voltadas para
        estratégias práticas, neurociência, convivência familiar e muito mais.
      </p>

      <p>
        As trilhas são uma maneira prática de manter o foco, acompanhar seu progresso e garantir que
        nenhum conteúdo importante fique de fora. Tudo isso com o apoio de recursos complementares e
        materiais exclusivos que ajudam a transformar conhecimento em ação.
      </p>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {categories.map((category) => (
          <Card key={category.id} shadow="sm" padding="lg" radius="md" withBorder>
            {/* <Card.Section>
              <Image
                src="https://conintdah.com/wp-content/uploads/2025/01/brain-2-1536x1138.webp"
                height={160}
                alt="Conin 6"
              />
            </Card.Section> */}

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{category.title} </Text>
            </Group>

            {/* <Text size="sm" c="dimmed">
              Um Evento Feito para Você: estratégias Simples, acolhimento e soluções baseadas em
              Evidências Científicas para transformações reais.
            </Text> */}

            <Button component={Link} href="/assinatura" fullWidth mt="auto" radius="md">
              Iniciar agora
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
