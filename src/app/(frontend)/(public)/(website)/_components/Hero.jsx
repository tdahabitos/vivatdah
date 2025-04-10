'use client'
import { Button, useMantineColorScheme } from '@mantine/core'

export default function Hero() {
  const { colorScheme } = useMantineColorScheme()

  return (
    <div className="mx-auto max-w-screen-xl py-4">
      <div className=" md:grid md:grid-cols-2 md:items-center md:gap-4">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold  sm:text-5xl">
            Entenda seu ritmo e
            <strong className="text-viva-orange-600"> aprenda de forma leve </strong>
          </h1>

          <p className="mt-4 text-base text-pretty  sm:text-lg/relaxed">
            Com a VivaTDAH, você tem autonomia para estudar do seu jeito. Chega de métodos que não
            funcionam com você — aqui, o foco é no que faz sentido para sua mente, com menos
            distração e mais evolução.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <Button size="xl" variant="outline" color={colorScheme === 'dark' ? 'white' : 'dark'}>
              Saiba mais
            </Button>
            <Button size="xl">Começe agora</Button>
          </div>
        </div>

        {colorScheme === 'dark' ? (
          <img src="/hero-cover-dark.svg" alt="Hero" />
        ) : (
          <img src="/hero-cover.svg" alt="Hero" />
        )}
      </div>
    </div>
  )
}
