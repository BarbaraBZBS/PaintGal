"use client";
//import Image from "next/image";
import React from "react";
//import logo from "@public/images/logonobg.png";
//import Link from "next/link";
import { useRouter } from "next/navigation";

//add a back image

export default function GoBack() {
    const router = useRouter();
   const handleBackPage = () => {
    const hasPreviousPage = window.history.length > 1;
        if (hasPreviousPage) {
            router.back();
        } else {
            router.push("/")
        }
    }
    
  return (
    <button className="cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors mx-[3rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.35rem] hover:text-black" onClick={handleBackPage}>
      GO BACK
                {/*<Image
                  src={logo}
                  alt="logo"
                  width={150}
                  height={60}
                  placeholder="blur"
                  priority
                  className="object-cover"
                />*/}
    </button>
  );
}