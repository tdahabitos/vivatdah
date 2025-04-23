import { payload } from "@/services/payload";
import cors from "@/utils/cors";
import type { NextRequest } from "next/server";

export async function OPTIONS() {
  return new Response(null, cors(204));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const video_id = searchParams.get("video_id");

  const comments = await payload
    .find({
      collection: "comments",
      where: {
        video_id: {
          equals: video_id,
        },
      },
      sort: ["-createdAt"],
    })
    .then((res) => res.docs);

  return Response.json(comments, cors(200));
}

export async function POST(request: Request) {
  const { video_id, user_id, comment } = await request.json();

  const newComment = await payload.create({
    collection: "comments",
    data: {
      video_id,
      user_id,
      comment,
    },
  });

  return Response.json(newComment, cors(201));
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const newComment = await payload.delete({
    collection: "comments",
    where: {
      id: {
        equals: id,
      },
    },
  });

  return Response.json(newComment, cors(200));
}
