import { Button } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import React from 'react'

export default function CtaButton() {
  return (
    <Button leftSection={<IconExternalLink size={18} />} color="orange">
      <span className="font-light">Conheça:</span>
      <span className="ml-1 font-bold">analisamente.com</span>
    </Button>
  )
}
