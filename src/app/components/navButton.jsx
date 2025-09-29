import React from "react";
import { useAnimate } from "framer-motion";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

export default function NavButton({
  children, id}) {
  const [scope, animate] = useAnimate();
  const router = useRouter();

  const handleClick = (id) => {
    //console.log("clicked");
    router.push(`Detail/${id}`);
  };
  const onButtonClick = () => {
    animate([
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
    ]);
  };

  return (
    <div ref={scope}>
      <button
        className={`cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black'}`}
        onClick={(e) => handleClick(id)}
      >
        {children}
      </button>
    </div>
  );
}
