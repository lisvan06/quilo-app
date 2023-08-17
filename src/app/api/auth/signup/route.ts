import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma/_base";

export async function GET() {
  try {
    const data = await prisma.user.findMany();
    console.log("Im Here");
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

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
      data: { username, email, password: hashedPassword },
    });

    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
