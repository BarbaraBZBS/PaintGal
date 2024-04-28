import Image from "next/image";
import gallery from "@/public/images/paintgalhome.jpg";
import Showcase from "./components/showcase";

export default async function Home() {
  //either pagination or sort paintings by category in carousel
  //or add in db categories array

  return (
    <main className="">
      <Image
        src={gallery}
        alt="logo"
        width={300}
        height={200}
        placeholder="blur"
        priority
        className="rounded-lg m-auto"
      />

      {/* add images but with pagination? */}
      <Showcase />
    </main>
  );
}
