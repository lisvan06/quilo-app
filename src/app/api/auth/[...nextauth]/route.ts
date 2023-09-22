import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/app/lib/prisma/_base";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
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
      if (trigger === "signUp") {
        // console.log("Is new user ");
        // console.log(token);
      } else {
        // console.log("Is not new user ");
        // console.log(token);
        //find the user by email on db and if not exist create new user
        //add id to the token
      }
      return { ...token, ...user };
    },

    session({ session, token, user, trigger }) {
      session.user = token.user as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl + "/login") return baseUrl + "/dashboard";
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
