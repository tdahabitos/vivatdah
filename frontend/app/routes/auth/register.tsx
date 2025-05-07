import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconBrandGoogle, IconMailCheck } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { z } from 'zod'
import AuthGuard from '~/components/auth-guard'
import { apiFetcher } from '~/lib/api'
import type { FormData } from '~/types'

import { getPageMeta } from '~/utils'

export const meta = () => getPageMeta({ pageTitle: 'Criar conta' })

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const validationSchema = z
    .object({
      email: z
        .string({ message: 'O campo é obrigatorio' })
        .email({ message: 'E-mail inválido' }),
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true)

    await apiFetcher
      .post('/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(() => setDone(true))
      .catch(() =>
        toast.error('Erro ao enviar a solicitação, por favor tente novamente')
      )
      .finally(() => setIsSubmitting(false))
  }

  if (done) {
    return (
      <Paper p="lg">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-lg text-center">
            Verifique seu e-mail para confirmar a conta
          </p>
          <IconMailCheck size={100} color="green" />
        </div>
      </Paper>
    )
  }

  return (
    <AuthGuard reverse>
      <Paper p="lg">
        <Group grow mb="md" mt="md">
          <Button leftSection={<IconBrandGoogle size={18} />}>
            Entrar com Google
          </Button>
        </Group>

        <Divider
          label="Ou crie uma conta com email"
          labelPosition="center"
          my="lg"
        />

        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Nome"
            placeholder="Seu nome"
            disabled={isSubmitting}
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Email"
            placeholder="meu@email.com"
            disabled={isSubmitting}
            {...form.getInputProps('email')}
          />

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

          <Group justify="space-between">
            <Anchor component={Link} to="/auth/login" c="dimmed" size="xs">
              Já tem uma conta? Entrar
            </Anchor>
            <Button type="submit" loading={isSubmitting}>
              Enviar
            </Button>
          </Group>

          <p className="text-xs opacity-50 text-center mt-8">
            Ao continuar, você concorda com os termos de uso e privacidade da
            plataforma
          </p>
        </form>
      </Paper>
    </AuthGuard>
  )
}
