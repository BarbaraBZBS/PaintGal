"use client";
import React, { use, useState } from "react";
import SubmitButton from "../components/submitButton";

export default function Sign() {
  const [state, setState] = useState();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const isDisabled = undefined;
  //const isDisabled = !firstName || !lastName || !address || !phone || !password;

  const handleClick = () => {
    setHasAccount(false);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("address", address);
      data.append("phone", phone);
      data.append("password", password);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const myData = await res.json();
      setState(myData.message);
      setFirstName("");
      setLastName("");
      setAddress("");
      setPhone("");
      setPassword("");
      (document.getElementById("newUserForm") as HTMLFormElement).reset();
      setTimeout(() => {
        setState(undefined);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Sign In</h1>
      <div>
        <p>Already have an account? </p>
        <button onClick={handleClick}>switch</button>
      </div>
      <div>
        <form action="">form</form>
      </div>
      {hasAccount ? (
        <form>Sign up</form>
      ) : (
        <div>
          <form
            id="newUserForm"
            onSubmit={onSubmit}
            className="grid"
          >
            <div className="max-h-[4rem] self-center text-center text-orange-600">
              {state}
            </div>
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="firstName"
              placeholder="first name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="lastName"
              placeholder="last name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="address"
              placeholder="address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="phone"
              placeholder="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
              type="text"
              name="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <div className="grid place-content-center">
            <SubmitButton isDisabled={isDisabled}>Sign up</SubmitButton>
          </div>
        </div>
      )}
    </main>
  );
}
