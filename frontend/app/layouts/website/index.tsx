import { Await, Outlet } from 'react-router'
import Header from './components/header'
import Footer from './components/footer'
import type { Route } from './+types'
import { apiFetcher } from '~/lib/api'
import PromoBanner from './components/promo-banner'
import { Suspense } from 'react'

export async function clientLoader() {
  const menu = apiFetcher('/pages')
  const config = apiFetcher('/config')

  return { menu, config }
}

export default function WebsiteLayout({ loaderData }: Route.ComponentProps) {
  const { menu, config } = loaderData

  return (
    <>
      <Suspense fallback={null}>
        <Await resolve={config}>
          {(data) => data.banner.active && <PromoBanner banner={data.banner} />}
        </Await>
      </Suspense>
      <Suspense fallback={null}>
        <Await resolve={menu}>{(data) => <Header menu={data} />}</Await>
      </Suspense>
      <div className="px-4 md:px-8">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
