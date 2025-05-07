import { Anchor, Button, Group, Paper, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCircleCheck } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { z } from 'zod'
import AuthGuard from '~/components/auth-guard'
import { apiFetcher } from '~/lib/api'
import type { FormData } from '~/types'

import { getPageMeta } from '~/utils'

export const meta = () => getPageMeta({ pageTitle: 'Redefinir senha' })

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const validationSchema = z.object({
    email: z
      .string({ message: 'O campo é obrigatorio' })
      .email({ message: 'E-mail inválido' }),
  })

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true)

    await apiFetcher
      .post('/auth/password-reset', { email: data.email })
      .then(() => setDone(true))
      .catch(() =>
        toast.error('Algo não correu bem, por favor tente novamente')
      )
      .finally(() => setIsSubmitting(false))
  }

  if (done) {
    return (
      <Paper p="lg">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-lg text-center">
            Verifique seu email para redefinir a senha
          </p>
          <IconCircleCheck size={100} color="green" />
        </div>
      </Paper>
    )
  }

  return (
    <AuthGuard reverse>
      <Paper p="lg">
        <h1 className="text-xl font-bold mb-4">Redefinir senha</h1>
        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="meu@email.com"
            disabled={isSubmitting}
            {...form.getInputProps('email')}
          />

          <Group justify="space-between">
            <Anchor component={Link} to="/auth/login" c="dimmed" size="xs">
              Já tem uma conta? Entrar
            </Anchor>
            <Button type="submit" loading={isSubmitting}>
              Enviar
            </Button>
          </Group>
        </form>
      </Paper>
    </AuthGuard>
  )
}
