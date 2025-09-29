import Image from "next/image";
import React from "react";
import logo from "@public/images/logonobg.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pgblue text-white grid grid-rows-[50%_50%] mt-[1rem] h-[7rem]">
      <Image
        src={logo}
        alt="logo"
        width={75}
        height={40}
        placeholder="blur"
        priority
        className="object-cover m-[1rem] rounded-md justify-self-center grayscale invert-100 "
      />
      <div className="grid w-full">
        <p className="text-[1.1rem] justify-self-center">
          ©️ 2024 PaintGal. All rights reserved
        </p>
        <nav className="justify-self-end mx-[0.5rem]">
          <Link href="/Feedback">Feedback</Link>
        </nav>
      </div>
    </footer>
  );
}
