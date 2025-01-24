import { createClient } from "@supabase/supabase-js";

export async function GET(request, { params }) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { id } = await params;

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.getUserById(id);

  if (error) throw new Error(error.message);

  return Response.json({
    name: user?.user_metadata.full_name,
    avatar: user?.user_metadata.avatar,
  });
}
