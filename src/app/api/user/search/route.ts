import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const enterprise = searchParams.get("enterprise");
  const address = searchParams.get("address");
  const phone = searchParams.get("phone");

  if (username) return await searchByKey("username", username);

  if (email) return await searchByKey("email", email);

  if (enterprise) return await searchByKey("enterprise", enterprise);

  if (address) return await searchByKey("address", address);

  if (phone) return await searchByKey("phone", phone);
}

export async function searchByKey(key: string, value: string) {
  const user = await prisma.user.findMany({
    where: {
      [key as string]: value,
    },
  });

  return NextResponse.json({ data: user }, { status: 200 });
}