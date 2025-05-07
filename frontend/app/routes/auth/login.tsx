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
import { IconBrandGoogle } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'
import AuthGuard from '~/components/auth-guard'
import { apiFetcher } from '~/lib/api'
import type { FormData } from '~/types'
import { getPageMeta } from '~/utils'

export const meta = () => getPageMeta({ pageTitle: 'Login' })

export default function LoginForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationSchema = z.object({
    email: z
      .string({ message: 'O campo é obrigatorio' })
      .email({ message: 'E-mail inválido' }),
    password: z.string({ message: 'O campo é obrigatorio' }),
  })

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit(data: FormData) {
    setIsSubmitting(true)

    await apiFetcher
      .post('/auth/signin', { email: data.email, password: data.password })
      .then(() => navigate('/dashboard'))
      .catch(() => toast.error('Email ou senha incorretos'))
      .finally(() => setIsSubmitting(false))
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
          label="Ou faça login com email"
          labelPosition="center"
          my="lg"
        />

        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
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

          <Group justify="space-between">
            <div className="flex flex-col gap-2">
              <Anchor component={Link} to="/auth/register" c="dimmed" size="xs">
                Não tem uma conta? Cadastre-se
              </Anchor>
              <Anchor
                component={Link}
                to="/auth/password-reset"
                c="dimmed"
                size="xs"
              >
                Esqueceu sua senha?
              </Anchor>
            </div>
            <Button type="submit" loading={isSubmitting}>
              Entrar
            </Button>
          </Group>
        </form>
      </Paper>
    </AuthGuard>
  )
}
