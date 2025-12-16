"use client";
import React, { useState } from "react";
import SubmitButton from "./submitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogs from "./socialLogs";

export default function RegisterForm() {
  const [state, setState] = useState();
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const isDisabled =
    !email || !firstName || !lastName || !address || !phone || !password;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.* ).{6,20}$/;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          address,
          phone,
          password,
        }),
      });
      if (res.ok) {
        const myData = await res.json();
        setState(myData.message);
        setEmail("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setPhone("");
        setPassword("");
        (document.getElementById("newUserForm") as HTMLFormElement).reset();
        setTimeout(() => {
          setState(undefined);
          router.push("/SignIn");
        }, 4000);
      } else {
        const errData = await res.json();
        setError(errData.message);
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setError("Registration failed.");
    }
  };

  return (
    <main>
      <div className="grid place-items-center h-screen">
        <div className="p-[3rem] shadow-card dark:shadow-indigo-400 border-t-8 rounded-3xl border-pgblue">
          <h1 className="text-center text-[2rem] m-[2rem] font-bold">
            Create an Account
          </h1>

          <form
            action=""
            className="grid gap-3 text-[1.5rem]"
            id="newUserForm"
            onSubmit={onSubmit}
          >
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="email"
              name="email"
              placeholder="Email"
              pattern={emailRegex.source}
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Enter a valid email address."
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <textarea
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              name="address"
              rows={3}
              placeholder="Address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="tel"
              name="phone"
              minLength={10}
              maxLength={15}
              placeholder="Phone Number"
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Phone number must be at least 10 digits."
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="password"
              name="password"
              minLength={6}
              maxLength={20}
              pattern={passRegex.source}
              placeholder="Password"
              required
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Password must be between 6 and 20 characters and must contain digits and letters."
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="grid place-content-center">
              <SubmitButton isDisabled={isDisabled}>Register</SubmitButton>
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
              href="/SignIn"
              className="place-self-end text-[1.5rem] "
            >
              Already have an account?{" "}
              <span className="underline decoration-2 decoration-indigo-500 mb-[2rem]">
                Sign In
              </span>
            </Link>
          </form>
            <SocialLogs />
        </div>
      </div>
    </main>
  );
}
