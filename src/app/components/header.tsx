"use client";
import logo from "@public/images/logonobg.png";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./themeButton";
import { AuthLog } from "./authLog";
import { motion, Transition, useCycle } from "motion/react";
import { useSession } from "next-auth/react";
import AdminNavigation from "./adminNavigation";

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
  const { data: session } = useSession();
  const status = session ? "authenticated" : "notAuthenticated";
  const privilege = session?.user?.role === "admin" ? "admin" : "user";
  return (
    <nav
      className="grid grid-cols-[65%_10%_25%] md:grid-cols-[56%_6%_37%] text-[1.4rem] md:text-[1.5rem] lg:text-[1.8rem] h-[7rem] mb-[1rem] border-gray-300 dark:border-pg border-b-[0.1rem] shadow-lg font-semibold"
    >
      <div className="grid place-content-center grid-cols-[75%_25%] self-center mx-[2rem] gap-2 md:grid-cols-[50%_50%] lg:grid-cols-[70%_30%]">
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
        <AdminNavigation />
      </div>
      <ThemeButton />

      <ul className="hidden md:grid grid-cols-[repeat(4,1fr)] justify-items-center">
        <li className="self-center z-30">
          <AuthLog
            status={status}
            privilege={privilege}
            toggle={() => toggleOpen()}
            isOpen={isOpen}
          />
        </li>
        <li className="self-center">
          <Link href="/">Home</Link>
        </li>
        {privilege === "user" ? (
          <li className="self-center">
            <Link href="/About">About</Link>
          </li>
        ) : (
          <li className="self-center">
            <Link href="/Dashboard">Dashboard</Link>
          </li>
        )}
        <li className="self-center">
          <Link href="/UserInfo">Account</Link>
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
          status={status}
          privilege={privilege}
          toggle={() => toggleOpen()}
          isOpen={isOpen}
        />
      </motion.div>
    </nav>
  );
}
