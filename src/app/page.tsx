import Image from "next/image";
import gallery from "../../public/images/paintgalhome.jpg";
import Showcase from "./components/showcase";

export default async function Home() {
  return (
    <main>
      <section className="relative ">
        <Image
          src={gallery}
          alt="logo"
          width={800}
          height={400}
          placeholder="blur"
          priority
          className="hidden lg:grid absolute rounded-lg opacity-30 top-10 left-10"
        />
        <div className="hidden lg:grid mb-[8rem] p-[5rem] text-center ">
          <h1 className="text-[3rem] mt-[8rem]">
            Welcome to Paintgal, the Art Gallery.
          </h1>
          <p className="text-[2.6rem] mt-[3rem]">Enjoy browsing our collection!</p>
          <p className="text-[2rem] mt-[3rem]">Paintings are sorted by category.</p>
        </div>
        <Image
          src={gallery}
          alt="logo"
          width={400}
          height={200}
          placeholder="blur"
          priority
          className="lg:hidden rounded-lg m-auto -z-10 relative"
        />{" "}
        <Showcase />
      </section>
    </main>
  );
}
