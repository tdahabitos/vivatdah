
import NotFound from '@/components/NotFound'
import Link from 'next/link'
import { Button } from '@mantine/core'

export default function Page() {
  return (
    <section className="w-full h-screen flex items-center">
      <NotFound>
        <Button component={Link} href="/">Voltar para a home</Button>
      </NotFound>
    </section>
  )
}
