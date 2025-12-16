import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    role?: string;
  }

  interface Session {
    user: {
      _id?: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      address?: string | null;
      phone?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    role?: string;
  }
}
