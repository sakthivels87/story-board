import { StoryCommentSchema } from "@/app/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await prisma?.comments.findMany({
    where: { storyId: params.id },
  });
  if (!result) return NextResponse.json("Comments not found", { status: 404 });
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const valiation = StoryCommentSchema.safeParse(body);
  if (!valiation.success) {
    return NextResponse.json(valiation.error.errors, { status: 400 });
  }
  const { storyId, comment } = body;
  if (session.user?.email) {
    const user = await prisma?.user.findUnique({
      where: { email: session.user.email },
    });
    const userId = user ? user.id : "";
    const result = await prisma?.comments.create({
      data: {
        storyId,
        comment,
        userId,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } else {
    return NextResponse.json("User email is not found", { status: 404 });
  }
}
