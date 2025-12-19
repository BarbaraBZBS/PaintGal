import React from "react";
import { useAnimate } from "motion/react";
import { useRouter } from "next/navigation";
import { Types } from "mongoose";

export default function NavButton({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string | Types.ObjectId;
}) {
  const [scope, animate] = useAnimate();
  const router = useRouter();

  const handleClick = (id: string | Types.ObjectId) => {
    //console.log("clicked");
    animate([
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
    ]);
    router.push(`Detail/${id.toString()}`);
  };

  return (
    <div ref={scope}>
      <button
        className={`cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-orange-300 '}`}
        onClick={(e) => handleClick(id)}
      >
        {children}
      </button>
    </div>
  );
}
