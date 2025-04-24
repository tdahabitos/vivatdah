import cors from '@/utils/cors'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { id } = await params

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.getUserById(id)

  if (error) throw new Error(error.message)

  return Response.json(
    {
      id: user?.id,
      name: user?.user_metadata.full_name,
      avatar: user?.user_metadata.avatar,
    },
    cors(200),
  )
}
