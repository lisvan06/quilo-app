import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let message = "";
let code = 0;

export default class UserService {
  async getUserByEmail<PrismaClient> (email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email }
      });
      return user;
    } catch (error) {
      return false;
    }
  }

  async createUser(data: any) {
    const { email, password } = data;
    const hashPassword = await bcrypt.hash(password, 12);

    if (!password && password.length < 6) {
      message = "Password must be at least 6 characters";
      code = 400;

      return NextResponse.json({ message: message }, { status: code });
    }

    const userFound = await prisma.user.findUnique({ where: { email: email } });

    if (userFound) {
      message = "Email already exists";
      code = 500;

      return NextResponse.json({ message: message }, { status: code });
    } else {
      const newUser = {
        email: email,
        password: hashPassword,
      };

      try {
        const result = await prisma.user.create({ data: newUser });
        message = "User Created";
        code = 200;
        return NextResponse.json({ message: message }, { status: code });
      } catch (error) {
        message = JSON.stringify(error);
        code = 500;
      }
    }
    return NextResponse.json({ message: message }, { status: code });
  }
}
