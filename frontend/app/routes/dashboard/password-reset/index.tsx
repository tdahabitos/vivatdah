import { Button, Card, Divider, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCircle, IconCircleCheckFilled } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import { Link } from 'react-router'
import { z } from 'zod'
import { supabase } from '~/lib/supabase'
import type { FormData } from '~/types'
import { getPageMeta } from '~/utils'

export const meta = () => getPageMeta({ pageTitle: 'Redefinir senha' })

export default function Settings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validationSchema = z
    .object({
      password: z
        .string({ message: 'O campo é obrigatorio' })
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(100, 'A senha deve ter no máximo 100 caracteres')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
        .regex(
          /[^a-zA-Z0-9]/,
          'A senha deve conter pelo menos um caractere especial'
        ),
      confirmPassword: z.string({ message: 'O campo é obrigatorio' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    })

  const form = useForm({
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    })

    if (!error) {
      setSuccess(true)
    }

    setIsSubmitting(false)
  }

  if (success) {
    return (
      <Card withBorder className="my-6 mx-[20%]">
        <div className="flex flex-col gap-4 ">
          <div>
            <div className="flex items-center gap-2">
              <IconCircleCheckFilled size={48} />
              <h2 className="text-2xl font-semibold">Tudo certo!</h2>
            </div>
            <p className="text-sm">Sua senha foi redefinida com sucesso</p>
          </div>

          <Button component={Link} to="/dashboard">
            Ir para a página inicial
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Redefinir senha</h2>

      <form
        className="flex flex-col gap-6"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            placeholder="Senha"
            label="Senha"
            type="password"
            disabled={isSubmitting}
            {...form.getInputProps('password')}
          />

          <TextInput
            placeholder="Confirme a senha"
            label="Confirme a senha"
            type="password"
            disabled={isSubmitting}
            {...form.getInputProps('confirmPassword')}
          />
        </div>

        <Divider />

        <div className="flex justify-end">
          <Button type="submit" loading={isSubmitting}>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}
