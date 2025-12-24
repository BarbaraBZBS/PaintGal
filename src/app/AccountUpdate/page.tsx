"use client";
import React from "react";
import SubmitButton from "../components/submitButton";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "motion/react";

function AccountUpdate() {
  const { data: session, update } = useSession();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled =
    !email && !firstName && !lastName && !address && !phone && !password;

  const doUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/${session?.user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email || session?.user.email,
            firstName: firstName || session?.user.firstName,
            lastName: lastName || session?.user.lastName,
            address: address || session?.user.address,
            phone: phone || session?.user.phone,
            password: password || session?.user.password,
          }),
        }
      );
      const data = await res.json();
      //console.log(data);
      if (data.status !== 200) {
        return alert(data.message);
      } else {
        alert("Your account has been updated!");
        await update({
          email: email || session?.user.email,
          firstName: firstName || session?.user.firstName,
          lastName: lastName || session?.user.lastName,
          address: address || session?.user.address,
          phone: phone || session?.user.phone,
        });
        setTimeout(() => {
          window.location.href = "/UserInfo";
        }, 200);
      }
    } catch (err) {
      alert(
        "Something went wrong, if the problem persists, please contact us."
      );
    }
  };

  const doDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/${session?.user?._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      //console.log("data : ",data);
      if (data.status !== 200) {
        return alert(data.message);
      } else {
        alert("Sad to see you go :( You will now be redirected to home page.");
        setTimeout(() => {
          window.location.href = "/SignOut";
        }, 200);
      }
    } catch (err) {
      alert(
        "Something went wrong, if the problem persists, please contact us."
      );
    }
  };

  return (
    <div className="grid place-content-center text-center text-[clamp(1.5rem,3vw,1.8rem)] p-[2rem]">
      <h1 className="text-[clamp(3rem,3vw,3.5rem)] mb-[3rem]">
        Account Update
      </h1>
      <p className="text-[clamp(1.6rem,3vw,2rem)] mb-[2rem]">
        Need to make some modifications?
      </p>
      <form
        id="usrUpdForm"
        onSubmit={(e) => {
          e.preventDefault();
          doUpdate();
        }}
        className="grid gap-[1rem] mb-[4rem]"
      >
        <input
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
          type="text"
          name="address"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton isDisabled={isDisabled}>Update</SubmitButton>
      </form>
      <h2 className="text-[clamp(2rem,3vw,2.5rem)] mb-[3rem]">
        Account Deletion
      </h2>
      <p className="text-[clamp(1.6rem,3vw,2rem)] mb-[2rem]">
        If you wish to delete your account, click the button below. <br />{" "}
        <span className="text-orange-400">This is irreversible!</span>
      </p>
      <div className="">
        <motion.button
          onClick={doDelete}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
        >
          Delete Account
        </motion.button>
      </div>
    </div>
  );
}

export default AccountUpdate;
