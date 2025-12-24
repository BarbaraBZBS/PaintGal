import Image from "next/image";
import logo from "@public/images/logonobg.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pgblue text-white grid grid-rows-[40%_30%_30%] min-h-[12rem] text-[clamp(1.3rem,3vw,1.6rem)] font-semibold">
      <Image
        src={logo}
        alt="logo"
        width={85}
        height={50}
        placeholder="blur"
        priority
        className="object-cover m-[1rem] rounded-md justify-self-center grayscale invert-100"
      />
      <div className="text-center">
        <p className="">
          ©️ 2024 PaintGal. All rights reserved
        </p>
      </div>
      <div className="text-end h-[3rem] mr-[3rem] ">
        <nav className="mx-[1rem] height-[3rem] md:height-[1rem] lg:height-[2rem]">
          <Link
            href="/Feedback"
            className="uppercase underline underline-offset-4 decoration-2 decoration-pink-500 font-bold hover:text-pgyellow"
          >
            Feedback
          </Link>
        </nav>
      </div>
    </footer>
  );
}
