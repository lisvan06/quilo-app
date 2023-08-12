import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const handler = NextAuth({
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
        }
      },
    })
  :
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
      if (user) {
        token.user = user;
      }
      return token;
    },

    session({ session, user, token }) {
      session.user = token.user as any;
      // console.log("session");
      // console.log(session);
      // console.log("user");
      // console.log(user);
      // console.log("token");
      // console.log(token);
      
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
