"use client";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  useEffect(() => {
    const doSignOut = async () => {
      await signOut({ callbackUrl: "/" });
    };
    doSignOut();
  }, []);

  return <div>Signing Out...</div>;
}
