import Hero from './components/hero'
import Stats from './components/stats'
import Cta from './components/cta'
import Testimonial from './components/testimonial'
import Blog from './components/blog'
import Newsletter from './components/newsletter'
import CookieConsent from './components/cookie-consent'
import type { Route } from './+types'
import Plans from '~/components/plans'
import { apiFetcher } from '~/lib/api'
import { getPageMeta } from '~/utils'
import { Suspense } from 'react'
import { Await } from 'react-router'

export const meta = () => getPageMeta({ pageTitle: 'Home' })

export async function clientLoader() {
  const posts = apiFetcher('/posts')
  const plans = apiFetcher('/plans')

  return {
    posts,
    plans,
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, plans } = loaderData

  return (
    <div className="space-y-24">
      <Hero />
      <Stats />
      <Cta />
      <Testimonial />
      <Suspense fallback={null}>
        <Await resolve={posts}>{(data) => <Blog posts={data} />}</Await>
      </Suspense>
      <Suspense fallback={null}>
        <Await resolve={plans}>{(data) => <Plans plans={data} />}</Await>
      </Suspense>
      <Newsletter />
      <CookieConsent />
    </div>
  )
}
