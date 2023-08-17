import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET() {
  try {
    const data = await prisma.product.findMany();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();

    if (!requestBody)
      return NextResponse.json({ data: "No body provided" }, { status: 400 });
    else {
      const price = parseFloat(requestBody.data.price);
      requestBody.data.price = price;
      const stock = parseInt(requestBody.data.stock);
      requestBody.data.stock = stock;

      const result = await prisma.product.create({ data: requestBody.data });
      if (result)
        return NextResponse.json({ data: "Product Added" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
    // if (error instanceof Error)
    //   return NextResponse.json({ data: error.message }, { status: 500 });
    // return NextResponse.json({ data: error }, { status: 500 });
  }
}
