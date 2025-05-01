import { Button } from '@mantine/core'
import { IconBubbleX } from '@tabler/icons-react'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-full flex items-center">
        <div className="p-8 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-sm text-center">
            <div className="w-full flex justify-center mb-4">
              <IconBubbleX size={120} />
            </div>
            <p className="mb-4 text-3xl tracking-tight font-bold ">Ooops</p>
            <p className="mb-4 text-lg font-light ">
              A página solicitada não foi encontrada
            </p>
            <Button component={Link} to="/">
              Voltar para a home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
