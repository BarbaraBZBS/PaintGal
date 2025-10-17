import NextAuth from "@node_modules/next-auth";
import Credentials from "@node_modules/next-auth/providers/credentials";
import dbConnect from "@src/lib/dbConnect";

import User from "@src/app/models/user";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import Email from "@node_modules/next-auth/providers/email";
import { IUser } from "@src/app/models/user";
import { JWT } from "@node_modules/next-auth/jwt";

//export const authOptions = {
//    providers: [
//        credentials({
//            name: "credentia
// ls",
//            credentials: {},
//            async authorize(credentials) {
//                await dbConnect();
//                try {
//                    const { email, password } = credentials as {
//                        email: string;
//                        password: string;
//                    };
//                    const user = await User.findOne({ email });
//                    if (!user) {
//                        return null;
//                    }
//                    const isPasswordCorrect = await bcrypt.compare(
//                        password,
//                        user.password
//                    );
//                    if (!isPasswordCorrect) {
//                        return null;
//                    }
//                    return user;
//                } catch (err) {
//                    console.log(err);
//                }
//            },
//        }),
//    ],
//    pages: {
//        signIn: "/sign",
//    },
//};

const handler = NextAuth({
  providers: [
    CredentialsProviders({
      //credentials: {
      //  email: {
      //    label: "Email",
      //    type: "email",
      //    placeholder: "email",
      //  },
      //  password: {
      //    label: "Password",
      //    type: "password",
      //    placeholder: "password",
      //  },
      //},
      async authorize(credentials) {
        //if (!credentials || !credentials?.email || !credentials.password) {
        //  return null;
        //}
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    pages: {
      signIn: "/sign",
    },
  },
});

export { handler as GET, handler as POST };
