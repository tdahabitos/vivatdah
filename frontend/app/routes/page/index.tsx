import type { Route } from './+types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Suspense } from 'react'
import { Await } from 'react-router'
import Categories from '~/components/categories'
import Plans from '~/components/plans'
import { api } from '~/lib/api'
import type { Page } from '~/types'
import { getPageMeta } from '~/utils'

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: data.page.title })

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const page = await api(`/pages/${params.slug}`)
  const plans = api('/plans')
  const categories = api('/categories')

  return {
    page,
    plans,
    categories,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { page, plans, categories } = loaderData

  const { title, content, shortcode } = page

  let specialPageBlock = null

  switch (shortcode) {
    case '[block:trilhas]':
      specialPageBlock = (
        <Suspense fallback={null}>
          <Await resolve={categories}>
            {(data) => <Categories categories={data} />}
          </Await>
        </Suspense>
      )
      break

    case '[block:assinatura]':
      specialPageBlock = (
        <Suspense fallback={null}>
          <Await resolve={plans}>{(data) => <Plans plans={data} />}</Await>
        </Suspense>
      )
      break

    default:
      break
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <RichText data={content} className="mb-12" />

      {specialPageBlock}
    </div>
  )
}
