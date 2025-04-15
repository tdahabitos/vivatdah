'use client'

import Plans from '../_components/Plans'

export default function AssinaturaPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Assinatura</h1>
      <p>
        Na Viva TDAH, entendemos que cada pessoa tem uma forma única de aprender. Por isso, criamos
        planos de assinatura que oferecem diferentes níveis de profundidade, suporte e acesso a
        conteúdos. Assim, você pode escolher o plano que melhor se encaixa com sua realidade e seus
        objetivos.
      </p>

      <Plans />
    </div>
  )
}
