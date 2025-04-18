import { payload } from "@/services/payload";

export async function GET() {
  const result = await payload.find({
    collection: "categories",
  });

  return Response.json({
    result,
  });
}
