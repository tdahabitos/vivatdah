'use client'

import { Button } from '@mantine/core'
import { IconBubbleX } from '@tabler/icons-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="w-full h-screen flex items-center">
      <div className="p-8 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className="w-full flex justify-center mb-4">
            <IconBubbleX size={120} />
          </div>
          <p className="mb-4 text-3xl tracking-tight font-bold ">Ooops</p>
          <p className="mb-4 text-lg font-light ">Página não encontrada</p>
          <Button component={Link} href="/">
            Voltar para a home
          </Button>
        </div>
      </div>
    </section>
  )
}
