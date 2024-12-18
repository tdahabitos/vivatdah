import { ActionIcon, Indicator } from '@mantine/core'
import { IconBellFilled } from '@tabler/icons-react'

export default function Notifications() {
  return (
    <ActionIcon variant="transparent">
      <Indicator offset={4} color="orange" size={8}>
        <IconBellFilled size={22} />
      </Indicator>
    </ActionIcon>
  )
}
