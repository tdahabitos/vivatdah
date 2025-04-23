import { payload } from "@/services/payload";
import type { NextRequest } from "next/server";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const video_id = searchParams.get("video_id");
  const user_id = searchParams.get("user_id");

  const feedback = await payload
    .find({
      collection: "feedback",
      where: {
        video_id: {
          equals: video_id,
        },
        user_id: {
          equals: user_id,
        },
      },
    })
    .then((res) => res.docs[0].type);

  const totalPositive = await payload
    .find({
      collection: "feedback",
      where: {
        video_id: {
          equals: video_id,
        },
        type: {
          equals: "positive",
        },
      },
    })
    .then((res) => res.totalDocs);

  return Response.json(
    {
      feedback,
      totalPositive,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  );
}

export async function POST(request: Request) {
  const { video_id, user_id, type } = await request.json();

  await payload.delete({
    collection: "feedback",
    where: {
      video_id: {
        equals: video_id,
      },
      user_id: {
        equals: user_id,
      },
    },
  });

  if (type) {
    await payload.create({
      collection: "feedback",
      data: {
        video_id,
        user_id,
        type,
      },
    });
  }

  const totalPositive = await payload
    .find({
      collection: "feedback",
      where: {
        video_id: {
          equals: video_id,
        },
        type: {
          equals: "positive",
        },
      },
    })
    .then((res) => res.totalDocs);

  return Response.json(
    {
      feedback: type,
      totalPositive,
    },
    {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  );
}
