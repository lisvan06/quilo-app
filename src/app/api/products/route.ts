import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      include: {
        category: true,
        image: true
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.json();
    console.log("RequestBody ", req.formData);
    if (!requestBody)
      return NextResponse.json({ data: "No body provided" }, { status: 400 });
    const price = parseFloat(requestBody.price);
    const stock = parseInt(requestBody.stock);
    requestBody.price = price;
    requestBody.stock = stock;

    const result = await prisma.product.create({ data: requestBody });
    if (result) return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
