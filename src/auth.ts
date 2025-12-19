import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@src/lib/dbConnect";
import { User, IUser } from "@src/app/models/user";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // Configure one or more authentication providers
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          return null;
        }

        try {
          await dbConnect();
          const user = (await User.findOne({ email })) as IUser | null;

          if (!user) {
            throw new Error("User not found.");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          // Return user object for NextAuth
          return {
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phone: user.phone.toString(),
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error(
            error instanceof Error
              ? error.message
              : "Authorization failed" + error
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.address = user.address;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        await dbConnect();
        const user = await User.findById(token._id);
        if (user && session.user) {
          session.user._id = user._id.toString();
          session.user.email = user.email;
          session.user.firstName = user.firstName;
          session.user.lastName = user.lastName;
          session.user.address = user.address;
          session.user.phone = user.phone.toString();
          session.user.role = user.role;
        }
      } catch (error) {
        console.error("Session callback error:", error);
      }
      return session;
    },
  },
});
