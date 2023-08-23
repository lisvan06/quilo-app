import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/app/lib/prisma/_base";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize() {
            return {
              id: "1",
              name: "J Smith",
              email: "jsmith@example.com",
              image: "https://i.pravatar.cc/150?u=jsmith@example.com",
            };
          },
        })
      : CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          credentials: {
            email: {
              label: "Username",
              type: "email",
              placeholder: "johndoe@email.com",
              name: "email",
              required: true,
            },
            password: {
              label: "Password",
              type: "password",
              name: "password",
              placeholder: "******",
              minlength: 6,
              required: true,
            },
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            // const user = { id: "1", username: "pepe", email: "pepe@example.com" };
            const email = credentials?.email as string;
            const password = credentials?.password as string;

            const userFounded = await prisma.user.findUnique({
              where: {
                email: email as string,
              },
            });

            if (userFounded) {
              const passwordMatch = await bcrypt.compare(
                password,
                userFounded!.password
              );

              if (passwordMatch === true) {
                userFounded.password = "";
                //console.log(userFounded);
                return userFounded;
              } else throw new Error("Invalid Credentials");
            } else throw new Error("Invalid Credentials");
          },
        }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token.user = session.user;
        return { ...token, ...user };
      }
      if (user) {
        token.user = user;
      }
      return { ...token, ...user };
    },

    session({ session, token, user, trigger }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
