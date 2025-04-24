import { payload } from "@/services/payload";
import cors from "@/utils/cors";
import type { NextRequest } from "next/server";

export async function OPTIONS() {
  return new Response(null, cors(204));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  const access = await payload
    .find({
      collection: "access",
      where: {
        email: {
          equals: email,
        },
      },
    })
    .then((res) => res.docs?.[0].allowed_categories || []);

  return Response.json(access, cors(200));
}
