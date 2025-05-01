import { getPageMeta } from '~/utils'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { Button, Card } from '@mantine/core'
import { Link } from 'react-router'

export const meta = () =>
  getPageMeta({ pageTitle: 'Pagamento realizado com sucessoß' })

export default function Page() {
  return (
    <Card>
      <div className="w-full flex flex-col items-center gap-4 p-4">
        <IconCircleCheckFilled size={124} color="#4CAF50" />
        <h1 className="text-2xl font-bold">Pagamento realizado com sucesso</h1>
        <Button component={Link} to="/dashboard">
          Ir para o dashboard
        </Button>
      </div>
    </Card>
  )
}
