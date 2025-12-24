"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DeletePainting({...painting}) {
    const router = useRouter();
    
  const handleClick = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/paintings/${painting._id}`, {
           method: "DELETE",
         });
         const myData = await res.json();
         console.log(myData);
         router.refresh();
      router.push("/Paintings");
  }
  
    return (
      <div className="grid justify-items-center m-[4rem] text-[clamp(1.7rem,3vw,2rem)]">
        <button
          className="cursor-pointer h-[8rem] w-[15rem] p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors mx-[3rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.35rem] hover:text-black"
          onClick={handleClick}
        >
          Confirm
        </button>
      </div>
    );
}
