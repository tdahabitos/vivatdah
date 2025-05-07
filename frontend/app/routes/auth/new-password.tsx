import { Button, Group, Paper, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { apiFetcher } from '~/lib/api'
import { supabase } from '~/lib/supabase'
import type { FormData } from '~/types'

import { getPageMeta } from '~/utils'

export const meta = () => getPageMeta({ pageTitle: 'Redefinir senha' })

export default function LoginForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true)

    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      password: data.password,
    })

    if (error) {
      toast.error('Algo não correu bem, por favor tente novamente')
      setIsSubmitting(false)
      return
    }

    toast.success('Senha alterada com sucesso')

    await apiFetcher.post('/auth/signout')
    await apiFetcher.post('/auth/signin', {
      email: user?.email,
      password: data.password,
    })

    navigate('/dashboard')
  }

  return (
    <Paper p="lg">
      <h1 className="text-xl font-bold mb-4">Nova senha</h1>

      <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          label="Senha"
          placeholder="Sua senha"
          disabled={isSubmitting}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirme sua senha"
          placeholder="Sua senha"
          disabled={isSubmitting}
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify="end">
          <Button type="submit" loading={isSubmitting}>
            Enviar
          </Button>
        </Group>

        <p className="text-xs opacity-50 text-center mt-8">
          Ao continuar, voce concorda com os termos de uso e privacidade da
          plataforma
        </p>
      </form>
    </Paper>
  )
}
