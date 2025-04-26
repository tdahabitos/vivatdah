import { payload } from '@/services/payload'
import cors from '@/utils/cors'
import type { NextRequest } from 'next/server'

export async function OPTIONS() {
  return new Response(null, cors(204))
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const video_id = searchParams.get('video_id')

  const views = await payload
    .find({
      collection: 'views',
      where: {
        video_id: {
          equals: video_id,
        },
      },
    })
    .then((res) => res.docs?.[0]?.views || 0)

  return Response.json(views, cors(200))
}

export async function POST(request: Request) {
  const { video_id } = await request.json()

  const currentViews = await payload
    .find({
      collection: 'views',
      where: {
        video_id: {
          equals: video_id,
        },
      },
    })
    .then((res) => res.docs[0])

  if (currentViews) {
    return await payload
      .update({
        collection: 'views',
        where: {
          video_id: {
            equals: video_id,
          },
        },
        data: {
          views: currentViews.views + 1,
        },
      })
      .then(() => {
        return Response.json(currentViews.views + 1, cors(200))
      })
  }

  return await payload
    .create({
      collection: 'views',
      data: {
        video_id,
        views: 1,
      },
    })
    .then(() => {
      return Response.json(1, cors(200))
    })
}
