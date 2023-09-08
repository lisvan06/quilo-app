import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

interface MySearchParams {
  title?: string;
  description?: string;
  stock?: string;
  price?: string;
  ownerId?: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // const {title, description, stock, price, ownerId} = searchParams as MySearchParams || {};
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const stock = searchParams.get("stock");
  const price = searchParams.get("price");
  const ownerId = searchParams.get("ownerId");

  // const where = {};

  // pendiente a revision
  // if (title) where["title"] = title;
  // if (description) where["description"] = description;
  // if (stock) where["stock"] = stock;
  // if (price) where["price"] = price;

  if (title) return await searchByKey("title", title);
  if (description) return await searchByKey("description", description);
  if (stock) return await searchByKey("stock", stock);
  if (price) return await searchByKey("price", price);
  
  if (ownerId) {
    const data = await prisma.user.findUnique({
      where: {
        id: ownerId,
        // deleted: false,
      },
      include: {
        products: {
          where: {
            ownerId: ownerId,
            deleted: false,
          }
        }
      }
    });

    return NextResponse.json(data, { status: 200 });
  }

  //make a switch case for all the search params
}

async function searchByKey(key: string, value: any) {
  var val = value;
  if (key == "stock" || key == "price") val = Number(value);
  const data = await prisma.product.findMany({
    where: {
      [key as string]: value as string,
      deleted: false,
    }
  });

  // const results = await prisma.product.findMany({
  //   skip: page*10,
  //   take: 10,
  //   where: {
  //     description: {
  //       contains: descript,
  //     },
  //   },
  //   orderBy: {
  //     title: 'desc',
  //   },
  // })

  return NextResponse.json({ data: data }, { status: 200 });
}
