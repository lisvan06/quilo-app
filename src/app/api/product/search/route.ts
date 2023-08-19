import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const stock = searchParams.get("stock");
  const price = searchParams.get("price");
  const ownerId = searchParams.get("ownerId");
  
  if (title) return await searchByKey("title", title);
  if (description) return await searchByKey("description", description);
  if (stock) return await searchByKey("stock", stock);
  if (price) return await searchByKey("price", price);
  if (ownerId) return await searchByKey("ownerId", ownerId);

  //make a switch case for all the search params
  
}

async function searchByKey(key: string, value: any) {
  var val = value;
  if (key == "stock" || key == "price") val = Number(value);
  const data = await prisma.product.findMany({
    where: {
      [key as string]: val,
    }
  });

  return NextResponse.json(data, { status: 200 });
}
