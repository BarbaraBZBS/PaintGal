import Image from "next/image";
import logo from "@public/images/logonobg.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pgblue text-white grid grid-rows-[50%_50%] min-h-[12rem]">
      <Image
        src={logo}
        alt="logo"
        width={85}
        height={50}
        placeholder="blur"
        priority
        className="object-cover m-[1rem] rounded-md justify-self-center grayscale invert-100"
      />
      <div className="grid w-full h-auto font-semibold">
        <p className="text-[1.3rem] justify-self-center">
          ©️ 2024 PaintGal. All rights reserved
        </p>
        <div className="place-self-end p-[1rem]">
          <nav className="mx-[1rem] text-[1.35rem] height-[3rem]">
            <Link
              href="/Feedback"
              className=""
            >
              Feedback
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
