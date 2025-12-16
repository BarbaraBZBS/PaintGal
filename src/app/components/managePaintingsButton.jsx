"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, scale } from "framer-motion";



export default function ManagePaintingsButton() {
    const router = useRouter();
   const goToAdminPage = () => {
            router.push("/Dashboard")
    }
    
  return (
    <motion.button
    whileTap={{ scale: 0.8 }}
    className="cursor-pointer p-[0.4rem] w-[7rem] h-[5.4rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors mx-[3rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.35rem] hover:text-black" onClick={goToAdminPage}>
                Dashboard
    </motion.button>
  )
}