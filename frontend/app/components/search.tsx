import { ActionIcon, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSearch } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import type { FormData } from '~/types'

export default function Search({ callback }: { callback?: () => void }) {
  const form = useForm({
    initialValues: {
      value: '',
    },
  })
  const navigate = useNavigate()

  function handleSubmit({ value }: FormData) {
    if (!value) return
    callback?.()
    navigate(`/dashboard/search?value=${value}`)
  }

  return (
    <form className="flex" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        className="flex-1"
        placeholder="Pesquisar"
        rightSection={
          <ActionIcon type="submit" variant="light">
            <IconSearch size={18} />
          </ActionIcon>
        }
        {...form.getInputProps('value')}
      />
    </form>
  )
}
