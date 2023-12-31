import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET() {  
  try {
    const data =await prisma.category.findMany({
      where: {
        deleted: false
      }
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();
    console.log(requestBody);
    if (!requestBody)
      return NextResponse.json({ data: "No body provided" }, { status: 400 });
    
    const result = await prisma.category.create({ data: requestBody });
    if (result) return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
