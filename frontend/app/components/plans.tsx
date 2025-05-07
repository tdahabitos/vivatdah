import { cn } from '~/utils'
import { Button, Divider } from '@mantine/core'
import {
  IconArrowBigRightFilled,
  IconCheck,
  IconTrophy,
} from '@tabler/icons-react'
import type { Plan } from '~/types'
import { Link } from 'react-router'
import { useAuth } from '~/hooks/use-auth'

export default function Plans({ plans }: { plans: Plan[] }) {
  const { user } = useAuth()

  return (
    <section className="px-4 md:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">
          Escolha o Plano Certo para Você
        </h2>

        <p className="mx-auto mt-4 mb-12">
          Nossos planos foram criados para atender às suas necessidades
          específicas. Escolha o que melhor se adapta ao seu ritmo de
          aprendizado.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch xl:grid-cols-3 xl:gap-8">
        {plans
          .filter((plan) => plan.show_at_home)
          .map((plan) => (
            <div
              key={plan.id}
              className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-xs text-center"
            >
              <div className="p-6 sm:px-8">
                <h2
                  className={cn(
                    'text-lg font-medium ',
                    plan.recomended &&
                      'bg-viva-orange-500 dark:bg-viva-orange-800 text-bold rounded text-white p-1 mx-[20%]'
                  )}
                >
                  <div className="flex justify-center items-center gap-2">
                    {plan.recomended && <IconTrophy size={20} />}
                    {plan.title}
                  </div>
                  <span className="sr-only">Plan</span>
                </h2>

                <Divider my="lg" />

                <p className="mt-2 ">{plan.description}</p>

                <p className="mt-2 sm:mt-4">
                  {plan.promoPrice ? (
                    <div className="flex flex-col gap-2">
                      <del className="font-medium text-xl">
                        {plan.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </del>
                      <strong className="text-3xl font-bold  sm:text-4xl">
                        {' '}
                        {plan.promoPrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </strong>
                    </div>
                  ) : (
                    <strong className="text-3xl font-bold  sm:text-4xl">
                      {' '}
                      {plan.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </strong>
                  )}

                  <span className="text-sm font-medium ">/mês</span>
                </p>

                <Divider my="lg" />

                <Button
                  component={Link}
                  to={
                    !user || plan.price === 0
                      ? '/dashboard'
                      : `/payments?plan=${plan.id}`
                  }
                  size={plan.recomended ? 'xl' : 'md'}
                  variant={plan.recomended ? 'filled' : 'light'}
                  rightSection={<IconArrowBigRightFilled size={16} />}
                >
                  Comece agora
                </Button>
              </div>

              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium sm:text-xl">Benefícios:</p>

                <ul className="mt-2 space-y-2 sm:mt-4">
                  {plan.features
                    .trim()
                    .split(',')
                    .map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-left"
                      >
                        <IconCheck size={16} /> <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
