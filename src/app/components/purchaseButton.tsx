"use client";
import React from "react";
import { useAnimate } from "framer-motion";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

export default function PurchaseButton({
  children,
  id,
}: {
  children: React.ReactNode;
  id: ObjectId;
}) {
  const [scope, animate] = useAnimate();
  const router = useRouter();

  const handleClick = () => {
    //console.log("clicked");
    animate([
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
    ]);
    //router.push(`Detail/${id}`);
  };

  return (
    <div ref={scope}>
      <button
        className={`cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-orange-300 '}`}
        onClick={(e) => handleClick()}
      >
        <h2 className=" uppercase text-[1.6rem] drop-shadow-darkenTxt">
          {children}
        </h2>
      </button>
    </div>
  );
}
