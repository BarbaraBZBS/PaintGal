"use client";
import React from "react";
import logo from "@public/images/logonobg.png";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./themeButton";
import { AuthLog } from "./authLog";
import { motion, Transition, useCycle } from "framer-motion";

const getSidebarVariants = (height: number) => ({
  open: {
    clipPath: `circle(${height * 1 + 10}px at 10vw 25px)`,
    transition: {
      type: "spring",
      stiffness: 100,
      restDelta: 1,
    } as Transition,
  },
  closed: {
    clipPath: "circle(20px at 10vw 25px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 300,
      damping: 50,
    } as Transition,
  },
});

export default function Header() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <nav className="grid grid-cols-[65%_10%_25%] md:grid-cols-[60%_10%_30%] text-[1.2rem] h-[7rem] mb-[1rem] border-gray-300 dark:border-pg border-b-[0.1rem] shadow-lg">
      <div className="self-center mx-[2rem]">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={60}
            placeholder="blur"
            priority
            className="object-cover"
          />
        </Link>
      </div>
      <ThemeButton />

      <ul className="hidden md:grid grid-cols-[33.33%_33.33%_33.33%] justify-items-end mx-[2rem]">
        <li className="self-center">
          <Link href="/">Home</Link>
        </li>
        <li className="self-center">
          <Link href="/About">About</Link>
        </li>
        <li className="self-center">
          <AuthLog
            toggle={() => toggleOpen()}
            isOpen={isOpen}
          />
        </li>
      </ul>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="md:hidden"
      >
        <motion.div
          className="absolute top-0 right-[2.5vw] bottom-0 w-[20vw] bg-white dark:bg-black rounded-b-xl"
          variants={getSidebarVariants(200)}
        />
        <AuthLog
          toggle={() => toggleOpen()}
          isOpen={isOpen}
        />
      </motion.div>
    </nav>
  );
}
