'use client'

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Logo from '@/components/Logo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from 'mantine-form-zod-resolver'
import GoogleAuthButton from '../_components/GoogleAuthButton'
import { useUserStore } from '@/store/userStore'
import { supabase } from '@/services/supabase/client'
import axios from 'axios'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { setUser } = useUserStore()

  const validationSchema = z.object({
    email: z.string({ message: 'O campo é obrigatorio' }).email({ message: 'E-mail inválido' }),
    password: z.string({ message: 'O campo é obrigatorio' }),
  })

  const form = useForm({
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit({ email, password }) {
    setIsLoading(true)

    const { allowed } = await axios
      .post('/api/public/auth/private-mode-verify', { email })
      .then((res) => res.data)

    if (!allowed) {
      form.setFieldError(
        'email',
        'Usuário incorreto ou não autorizado. Por favor, contate o suporte: contato@vivatdah.com',
      )
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      form.setFieldError('password', 'E-mail e/ou senha incorretos')
      setIsLoading(false)
      return
    }

    setUser(data.user)
    push('/dashboard')
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Paper w="100%" maw="450px" p="xl" withBorder>
        <div className="flex justify-center mb-4">
          <Logo className="h-20 w-auto" />
        </div>

        {/* <Divider label="Login" labelPosition="center" my="lg" />
        
        <Group grow mb="md" mt="md">
          <GoogleAuthButton />
        </Group>

        <Divider label="Ou continue com email" labelPosition="center" my="lg" /> */}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="E-mail"
              placeholder="meu-melhor@email.com"
              disabled={isLoading}
              {...form.getInputProps('email')}
            />

            <div>
              <PasswordInput
                label="Senha"
                placeholder="Sua senha"
                disabled={isLoading}
                {...form.getInputProps('password')}
              />
              <Anchor
                component={Link}
                href="/auth/forgot-password"
                type="button"
                c="dimmed"
                size="xs"
              >
                Esqueceu sua senha?
              </Anchor>
            </div>
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} href="/auth/register" type="button" c="dimmed" size="xs">
              Não tem uma conta? Cadastre-se
            </Anchor>

            <Button type="submit" loading={isLoading}>
              Enviar
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  )
}
