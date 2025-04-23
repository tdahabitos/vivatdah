import { payload } from "@/services/payload";

export async function POST(request: Request) {
  const args = await request.json();

  const result = await payload.find({
    ...args,
  });

  return Response.json({
    result,
  });
}
