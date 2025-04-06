import { payload } from '@/services/payload'

export async function POST(request) {
  const data = await request.json()

  if (!data?.email) return Response.json({ allowed: false })

  const { auth_private_mode, auth_allowed_user_emails } = await payload.findGlobal({
    slug: 'administration',
  })

  if (!auth_private_mode) return Response.json({ allowed: true })

  return Response.json({
    allowed:
      auth_private_mode &&
      auth_allowed_user_emails.replace(/\s/g, '').split(',').includes(data?.email),
  })
}
