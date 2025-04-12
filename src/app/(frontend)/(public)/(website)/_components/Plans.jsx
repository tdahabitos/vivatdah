import { cn } from '@/utils'
import { Button, Divider } from '@mantine/core'
import {
  IconArrowBigRightFilled,
  IconArrowMoveRight,
  IconArrowRight,
  IconCheck,
  IconStar,
  IconStarFilled,
  IconTrophy,
  IconTrophyFilled,
} from '@tabler/icons-react'

const plans = [
  {
    id: 1,
    name: 'Starter',
    description: 'Ideal para iniciantes que querem partipar da nossa comunidade',
    price: 'R$ 49,90',
    recomended: false,
    features: [
      'Introdução ao TDAH',
      'Conteúdo introdutório e estruturado',
      'Acesso ilimitado à plataforma',
      'Suporte 1x por semana via e-mail',
      'Exercícios práticos básicos',
    ],
  },
  {
    id: 2,
    name: 'Viva!',
    description: 'Perfeito para quem quer ir além e melhorar seu ritmo de aprendizado',
    price: 'R$ 99,90',
    recomended: true,
    features: [
      'Curso completo sobre TDAH',
      'Acesso a vídeos e materiais extras',
      'Acesso ilimitado à plataforma',
      'Suporte 2x por semana via e-mail',
      'Acompanhamento de progresso',
      'Participação em comunidade exclusiva',
    ],
  },
  {
    id: 3,
    name: 'Premium',
    description: 'Para quem busca um acompanhamento intensivo e personalizado',
    price: 'R$ 149,90',
    recomended: false,
    features: [
      'Sessões ao vivo mensais com especialistas',
      'Suporte prioritário',
      'Plano de estudos personalizado',
      'Certificado de conclusão avançado',
      'Acesso antecipado a novos conteúdos',
    ],
  },
]

export default function Plans() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">Escolha o Plano Certo para Você</h2>

        <p className="mx-auto mt-4  ">
          Nossos planos foram criados para atender às suas necessidades específicas. Escolha o que
          melhor se adapta ao seu ritmo de aprendizado.
        </p>

        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-xs"
              >
                <div className="p-6 sm:px-8">
                  <h2
                    className={cn(
                      'text-lg font-medium ',
                      plan.recomended &&
                        'bg-viva-orange-500 text-bold rounded text-white p-1 mx-[20%]',
                    )}
                  >
                    <div className="flex justify-center items-center gap-2">
                      {plan.recomended && <IconTrophy size={20} />}
                      {plan.name}
                    </div>
                    <span className="sr-only">Plan</span>
                  </h2>

                  <Divider my="lg" />

                  <p className="mt-2 ">{plan.description}</p>

                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold  sm:text-4xl"> {plan.price} </strong>

                    <span className="text-sm font-medium ">/mês</span>
                  </p>

                  <Divider my="lg" />

                  <Button
                    size={plan.recomended ? 'xl' : 'md'}
                    variant={plan.recomended ? 'filled' : 'light'}
                    rightSection={<IconArrowBigRightFilled size={16} />}
                  >
                    Comece agora
                  </Button>
                </div>

                <div className="p-6 sm:px-8">
                  <p className="text-lg font-medium  sm:text-xl">Benefícios:</p>

                  <ul className="mt-2 space-y-2 sm:mt-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-left">
                        <IconCheck size={16} /> <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
