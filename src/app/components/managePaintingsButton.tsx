"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, scale } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const element = (
  <FontAwesomeIcon
    icon={faEllipsis}
    size="lg"
  />
);


export default function ManagePaintingsButton() {
    const router = useRouter();
   const goToAdminPage = () => {
      router.push("/Dashboard")
    }
    
  return (
    <motion.button
    whileTap={{ scale: 0.8, animationDuration: 0.1 }}
    title="Dashboard"
    className="cursor-pointer md:p-[0.4rem] md:w-[7rem]  bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors hover:bg-pgyellow hover:border-pgnavy hover:border-[0.35rem] hover:text-black" onClick={goToAdminPage}>
     {element}
    </motion.button>
  )
}