'use client'

import { useMantineColorScheme } from '@mantine/core'

export default function OQueEsperarPage() {
  const { colorScheme } = useMantineColorScheme()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">O que esperar?</h1>

      <p>
        Ao entrar na Viva TDAH, você terá acesso a uma plataforma completa, com conteúdo atualizado,
        linguagem acessível e uma experiência pensada para quem vive na prática os desafios do TDAH.
        Você encontrará vídeos, textos, exercícios e recursos organizados em trilhas temáticas e
        progressivas.
      </p>

      <p>
        Nosso objetivo é tornar o aprendizado sobre TDAH leve, intuitivo e aplicável. Aqui, você não
        precisa se preocupar em “por onde começar” — nossa estrutura foi desenhada para te guiar do
        básico ao avançado, respeitando seu ritmo e suas preferências. Tudo está ao seu alcance, de
        forma clara e organizada.
      </p>

      <p>
        Além disso, você terá suporte contínuo e acesso a uma comunidade de pessoas que compartilham
        experiências semelhantes. Aprender sobre TDAH é também descobrir que você não está sozinho —
        e que é possível lidar com tudo isso com mais conhecimento, empatia e confiança.
      </p>

      <div className="w-full md:w-1/2 mx-auto mt-8">
        {colorScheme === 'dark' ? (
          <img src="/hero-cover-dark.svg" alt="Hero" />
        ) : (
          <img src="/hero-cover.svg" alt="Hero" />
        )}
      </div>
    </div>
  )
}
