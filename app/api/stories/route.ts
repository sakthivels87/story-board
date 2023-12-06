import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createStorySchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const valiation = createStorySchema.safeParse(body);
  if (!valiation.success) {
    return NextResponse.json(valiation.error.errors, { status: 400 });
  }
  const result = await prisma.story.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(result);
}

export async function GET(request: NextRequest) {
  const results = await prisma.story.findMany();
  return NextResponse.json(results);
}
