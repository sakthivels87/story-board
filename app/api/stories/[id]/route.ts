import { pathStorySchema } from "@/app/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const valiation = pathStorySchema.safeParse(body);
  if (!valiation.success)
    return NextResponse.json(valiation.error.format(), { status: 400 });

  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) return NextResponse.json("Not found", { status: 404 });
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) return NextResponse.json("User not found..", { status: 400 });
  }
  const updateStory = await prisma?.story.update({
    where: { id: story.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updateStory);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const story = await prisma?.story.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!story) return NextResponse.json("Not Found", { status: 404 });

  return NextResponse.json(story, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const story = await prisma.story.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!story)
    return NextResponse.json("Given story not found", { status: 404 });

  await prisma.story.delete({ where: { id: story.id } });
  return NextResponse.json({});
}
