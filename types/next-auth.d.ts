import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "@next-auth/prisma-adapter" {
  export function PrismaAdapter(prisma: PrismaClient): Adapter;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
    };
  }
}
