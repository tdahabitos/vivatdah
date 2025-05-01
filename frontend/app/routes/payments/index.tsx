import type { Page } from '~/types'
import { getPageMeta } from '~/utils'
import type { Route } from './+types'
import { useNavigate } from 'react-router'
import { getCheckoutUrl } from '~/lib/api'
import { useEffect } from 'react'
import { Loader } from '@mantine/core'

export const meta = () => getPageMeta({ pageTitle: 'Pagamento' })

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const planId = url.searchParams.get('plan')

  if (!planId) {
    return {
      checkoutUrl: null,
    }
  }

  const checkoutUrl = await getCheckoutUrl(planId).catch(() => null)

  return {
    checkoutUrl,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { checkoutUrl } = loaderData
  const navigate = useNavigate()

  useEffect(() => {
    if (!checkoutUrl) navigate('/auth')
    window.location.replace(checkoutUrl)
  }, [checkoutUrl])

  return (
    <div className="w-full flex justify-center">
      <Loader size="xl" type="dots" />
    </div>
  )
}
