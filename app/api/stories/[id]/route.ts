import { CreateStorySchema } from "@/app/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const valiation = CreateStorySchema.safeParse(body);
  if (!valiation.success)
    return NextResponse.json(valiation.error.format(), { status: 400 });

  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) return NextResponse.json("Not found", { status: 404 });

  const updateStory = await prisma?.story.update({
    where: { id: story.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateStory);
}
