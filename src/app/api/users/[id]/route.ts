import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: params.id as string,
      },
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestBody = await req.json();

  try {
    const data = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        enterprise: requestBody.enterprise,
        address: requestBody.address,
      },
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = {};
    const data = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {},
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {},
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
