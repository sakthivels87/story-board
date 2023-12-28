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
  return NextResponse.json("Successfully added comments", { status: 201 });
}
