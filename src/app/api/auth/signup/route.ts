import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !email.includes("@"))
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });

  if (!password || password.length < 6)
    return NextResponse.json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );

  try {
    const userFound = await prisma.user.findUnique({ where: { email } });
    if (userFound)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
