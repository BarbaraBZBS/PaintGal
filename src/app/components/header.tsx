import React from "react";
import logo from "@public/images/logonobg.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="grid grid-cols-[70%_30%] text-[1.2rem] h-[5rem] mb-[1rem]">
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
      <ul className="grid justify-items-end mx-[2rem]">
        <li className="self-center">
          <Link href="/">Home</Link>
        </li>
        <li className="self-center">
          <Link href="/About">About</Link>
        </li>
      </ul>
    </nav>
  );
}
