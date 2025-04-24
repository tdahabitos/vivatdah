import { payload } from "@/services/payload";
import cors from "@/utils/cors";

export async function OPTIONS() {
  return new Response(null, cors(204));
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.email) return Response.json(false);

  const { auth_private_mode, auth_allowed_user_emails } =
    await payload.findGlobal({
      slug: "authentication",
    });

  if (!auth_private_mode) return Response.json(true);
  if (!auth_allowed_user_emails) return Response.json(false);

  return Response.json(
    auth_allowed_user_emails
      .replace(/\s/g, "")
      .split(",")
      .map((email) => email.toLowerCase())
      .includes(data.email.toLowerCase()),
    cors(200),
  );
}
