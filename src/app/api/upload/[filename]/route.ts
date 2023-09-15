import { prisma } from "@/app/lib/prisma/_base";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
  const images = await prisma.image.findMany();
  return NextResponse.json({ data: images }, { status: 200 });
}
