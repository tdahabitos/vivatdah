'use client'

import { Card } from '@mantine/core'
import getMetadata from '@/utils/metadata'

export const metadata = getMetadata({
  title: 'VivaTDAH - Contato',
})

export default function ContatoPage() {
  return (
    <div className="flex flex-col gap-4">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo aspernatur esse sit! Et,
        cumque quisquam? Consequatur temporibus molestiae magni id illo sapiente laboriosam quod hic
        asperiores! Eveniet vitae dolor quod. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Laudantium, voluptates natus aliquid quae esse, hic placeat tenetur officia ea
        repudiandae id provident. Natus corrupti similique blanditiis ullam pariatur dolorum
        explicabo!
      </p>

      <h2 className="text-xl font-bold">Informações de contato</h2>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <span className="text-sm font-bold">Telefone:</span>
        <span className="text-sm">(00) 0000-0000</span>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <span className="text-sm font-bold">E-mail:</span>
        <span className="text-sm">contato@vivatda.com</span>
      </Card>
    </div>
  )
}
