import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {  
  try {
    const data = await prisma.category.findUnique({
      where: {
        id: params.id as string,
        deleted: false
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
    const data = await prisma.category.update({
      where: {
        id: params.id,
        deleted: false
      },
      data: {
        name: requestBody.name,
      },
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.category.update({
      //Search soft_delete on prisma docs
      where: {
        id: params.id,
        deleted: false
      },
      data: {
        deleted: true,
      },
    });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
