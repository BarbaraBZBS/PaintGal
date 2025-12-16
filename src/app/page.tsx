import Image from "next/image";
import gallery from "../../public/images/paintgalhome.jpg";
import Showcase from "./components/showcase";

export default async function Home() {
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

      {/*<Showcase />*/}
    </main>
  );
}
