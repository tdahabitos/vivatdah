import { Card } from '@mantine/core'
import {
  IconCertificate,
  IconClockHour4,
  IconDownload,
  IconScanPosition,
} from '@tabler/icons-react'
import React from 'react'

export default function Stats() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Recomendado por alunos e educadores</h2>

        <p className="mt-4  sm:text-xl">
          Nossa missão é empoderar pessoas com TDAH a aprenderem de forma efetiva e no seu próprio
          ritmo. Junte-se a milhares que transformaram suas jornadas educacionais com a VivaTDAH.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card withBorder className="flex flex-col rounded-lg px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium ">
            Inúmeras horas investidas no sucesso de nossos alunos
          </dt>

          <dd className="flex justify-center mb-4">
            <IconClockHour4 color="#ffa018" size={64} />
          </dd>
        </Card>

        <Card withBorder className="flex flex-col rounded-lg  px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium ">Cursos certificados e adaptados</dt>

          <dd className="flex justify-center mb-4">
            <IconCertificate color="#ffa018" size={64} />
          </dd>
        </Card>

        <Card withBorder className="flex flex-col rounded-lg  px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium ">Ferramentas de apoio exclusivas</dt>

          <dd className="flex justify-center mb-4">
            <IconScanPosition color="#ffa018" size={64} />
          </dd>
        </Card>

        <Card withBorder className="flex flex-col rounded-lg  px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium ">Downloads de recursos e materiais</dt>

          <dd className="flex justify-center mb-4">
            <IconDownload color="#ffa018" size={64} />
          </dd>
        </Card>
      </dl>
    </div>
  )
}
