import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma?.user.findUnique({ where: { id: params.id } });
  if (user) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json("User Not Found!!!", { status: 200 });
  }
}
