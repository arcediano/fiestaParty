// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { SessionSubscription } from "@/types"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      subscription?: SessionSubscription
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    subscription?: SessionSubscription
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    subscription?: SessionSubscription
  }
}