'use client'

import { Button, Group, Paper, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import Logo from '@/components/Logo'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from 'mantine-form-zod-resolver'
import { supabase } from '@/services/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const validationSchema = z
    .object({
      password: z
        .string({ message: 'Campo obrigatório' })
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(32, 'A senha pode ter no máximo 32 caracteres')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
        .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial (ex.: !@#$%&)'),
      passwordConfirmation: z.string({ message: 'Campo obrigatório' }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    })

  const form = useForm({
    validate: zodResolver(validationSchema),
  })

  async function handleSubmit(data) {
    setIsLoading(true)

    await supabase.auth
      .updateUser({ password: data.password })
      .then(() => {
        push('/auth/login?resetPassword=true')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Paper w="100%" maw="450px" p="xl" withBorder>
        <div className="flex justify-center mb-4">
          <Logo className="h-20 w-auto" />
        </div>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              disabled={isLoading}
              {...form.getInputProps('password')}
            />

            <PasswordInput
              label="Confirmar senha"
              placeholder="Sua senha"
              disabled={isLoading}
              {...form.getInputProps('passwordConfirmation')}
            />
          </Stack>

          <Group justify="end" mt="xl">
            <Button type="submit" loading={isLoading}>
              Enviar
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  )
}
