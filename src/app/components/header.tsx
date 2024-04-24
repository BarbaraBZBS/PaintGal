import React from "react";
import logo from "@public/images/logonobg.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-appopred grid grid-cols-[70%_30%]">
      <div className="animate-fill">
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
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/About">About</Link>
        </li>
      </ul>
    </nav>
  );
}
