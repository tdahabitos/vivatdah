import { payload } from "@/services/payload";
import cors from "@/utils/cors";
import type { NextRequest } from "next/server";

export async function OPTIONS() {
  return new Response(null, cors(204));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const video_id = searchParams.get("video_id");
  const user_id = searchParams.get("user_id");

  const saved = await payload
    .find({
      collection: "saved",
      where: {
        video_id: {
          equals: video_id,
        },
        user_id: {
          equals: user_id,
        },
      },
    })
    .then((res) => res.docs);

  return Response.json(saved.length > 0, cors(200));
}

export async function POST(request: Request) {
  const { video_id, user_id, action } = await request.json();

  await payload.delete({
    collection: "saved",
    where: {
      video_id: {
        equals: video_id,
      },
      user_id: {
        equals: user_id,
      },
    },
  });

  if (action === "save") {
    await payload.create({
      collection: "saved",
      data: {
        video_id,
        user_id,
      },
    });
  }

  return Response.json(action === "save", cors(action === "save" ? 201 : 200));
}
