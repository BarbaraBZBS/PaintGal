"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, scale } from "motion/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const element = <FontAwesomeIcon icon={faLeftLong} size="lg" />


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
    <motion.button
    whileTap={{ scale: 0.8 }}
    className="cursor-pointer p-[1rem] w-[5rem] h-[5.4rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors mx-[3rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.35rem] hover:text-black" onClick={handleBackPage}>
                {element}
    </motion.button>
  );
}