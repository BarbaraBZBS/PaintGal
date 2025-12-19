"use client";
import React, { useState } from "react";
import SubmitButton from "./submitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogs from "./socialLogs";
import { useSession } from "next-auth/react";
import { doCredentialsLogin } from "../actions";

export default function SignForm() {
  const [state, setState] = useState();
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const isDisabled = !email || !password;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();
    try {
      const result = await doCredentialsLogin(new FormData(e.currentTarget));
      if (result?.error) {
        setError(result.error);
      } else {
        const updatedSession = await update();
        //console.log("updatedSession", updatedSession);
        if (updatedSession?.user?.role === "admin") {
          router.push("/Dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Check your credentials.");
    }
  }

  return (
    <main>
      <div className="grid place-items-center h-screen">
        <div className="p-[3rem] shadow-card dark:shadow-indigo-400 border-t-8 rounded-3xl border-pgblue">
          <h1 className="text-center text-[2rem] m-[2rem] font-bold">
            Log In To Account
          </h1>

          <form
            className="grid gap-3 text-[1.5rem]"
            id="newUserForm"
            onSubmit={onSubmit}
          >
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="grid place-content-center">
              <SubmitButton isDisabled={isDisabled}>Log In</SubmitButton>
            </div>
            <div className="max-h-[4rem] self-center text-center text-green-700">
              {state}
            </div>
            {error && (
              <div className="max-h-[4rem] self-center text-center text-orange-600">
                {error}
              </div>
            )}
            <Link
              href="/Register"
              className="place-self-end text-[1.5rem] "
            >
              Need to create an account?{" "}
              <span className="underline decoration-2 decoration-indigo-500">
                Register
              </span>
            </Link>
          </form>
          <SocialLogs />
        </div>
      </div>
    </main>
  );
}
