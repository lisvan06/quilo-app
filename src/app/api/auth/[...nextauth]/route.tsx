import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export const handler = NextAuth({
  // adapter: PrismaAdapter(prisma),
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

        const prisma = new PrismaClient();
        const userFounded = await prisma.user.findUnique({
          where: { email: email },
        });

        if (userFounded) {          
          const passwordMatch = await bcrypt.compare(
            password,
            userFounded!.password
          );

          if (passwordMatch == true) return userFounded;
          else throw new Error("Invalid Credentials");
        } else throw new Error("Invalid Credentials");
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },

    session({ session, token }) {
      session.user = token.user as any;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
export { handler as GET, handler as POST };
