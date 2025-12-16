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
      //name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //async authorize(credentials, request) {
      // The name to display on the sign in form (e.g. "Sign in with...")
      //name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      //credentials: {
      //email: { label: "email", type: "text", placeholder: "jsmith" },
      //password: { label: "Password", type: "password" }
      //},
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
      //
      //        const res = await fetch(
      //          `${process.env.NEXT_PUBLIC_API}/auth/login`,
      //          {
      //            method: "POST",
      //            headers: {
      //              "Content-Type": "application/json",
      //            },
      //            body: JSON.stringify({
      //              email: credentials.email,
      //              password: credentials.password,
      //            }),
      //          }
      //        );
      //
      //        const user = await res.json();
      //
      //        if (res.ok && user) {
      //          return user;
      //        } else {
      //          return null;
      //        }
      //} catch (error) {
      //  console.log("Authorize error:", error);
      //  //return null;
      //}
      //},
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  //  session({ session, token, user }) {
  //    // `session.user.address` is now a valid property, and will be type-checked
  //    // in places like `useSession().data.user` or `auth().user`
  //    return {
  //      ...session,
  //      user: {
  //        ...session.user,
  //        address: user.address,
  //      },
  //    }
  //  },
  //},
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
      if (session.user) {
        session.user._id = token._id as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.address = token.address as string;
        session.user.phone = token.phone as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
