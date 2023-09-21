import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");

  if (name) {
    const data = await searchByKey("name", name);
    return NextResponse.json(data, { status: 200 });
  }
  return NextResponse.json({"error": "No params founded"}, { status: 200 });
  //make a switch case for all the search params
}

async function searchByKey(key: string, value: any) {  
  const data = await prisma.category.findMany({
    where: {
      [key as string]: value as string,
      deleted: false,
    }
  });

  return NextResponse.json({ data: data }, { status: 200 });
}
