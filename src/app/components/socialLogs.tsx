import React from "react";
import { doSocialLogin } from "@src/app/actions";

export default function SocialLogs() {
  return (
    <form
      action={doSocialLogin}
      className="grid grid-cols-[1fr_1fr] mt-[3rem] gap-[1rem] text-[clamp(1.2rem,3vw,1.6rem)]"
    >
      <button
        type="submit"
        name="action"
        value="google"
        className="cursor-pointer p-[1rem] text-white border-[0.3rem] border-pgnavy rounded-lg mb-[2rem] hover:bg-pgyellow hover:text-black bg-pgblue"
      >
        Sign in with Google
      </button>
      <button
        type="submit"
        name="action"
        value="github"
        className="cursor-pointer p-[1rem] text-white border-[0.3rem] border-pgnavy rounded-lg mb-[2rem] hover:bg-pgyellow hover:text-black bg-pgblue"
      >
        Sign in with Github
      </button>
    </form>
  );
}
