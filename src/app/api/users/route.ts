import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET(get: NextRequest) {
  //Get all users
  
  try {
    const data = await prisma.user.findMany({});
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {}
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();
    const result = await prisma.user.create({ data: requestBody });
    return NextResponse.json({ data: requestBody }, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ data: error.message }, { status: 500 });
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
