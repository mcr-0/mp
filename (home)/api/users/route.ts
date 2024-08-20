import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username) {
          console.error("No credentials or username provided");
          throw new Error("Username is required");
        }

        const { username } = credentials;

        try {
          // Find the user by username
          const user = await prisma.user.findUnique({
            where: { username: username },
          });

          // If the user does not exist, create a new user
          if (!user) {
            const newUser = await prisma.user.create({
              data: { username: username },
            });
            return newUser;
          }

          // Return the user if found
          return user;
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Customize the sign-in page URL if needed
    error: "/auth/error", // Add custom error page if needed
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
