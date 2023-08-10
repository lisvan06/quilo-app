import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma =  new PrismaClient();

export async function GET() {
  try {    
    const data = await prisma.product.findMany();    
    return NextResponse.json({ data: data }, {status: 200});
  } catch (error) {
    return NextResponse.json({ error }, {status: 500});
  }
}

export async function POST(req: NextResponse, res: NextRequest) {
  try {    
    const requestBody = await req.json();
    const result = await prisma.product.create({data: requestBody});
    return NextResponse.json({ data: requestBody }, {status: 201});
  } catch (error) {
      return NextResponse.json({data: error}, {status: 500})
  }
};
