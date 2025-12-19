import Link from "next/link";
import GoBack from "@src/app/components/goBack";

//ADMIN


export default function ManagePaintings() {
  return (
    <>
      <main className="">
        <div className="grid justify-items-end mb-[4rem]">
          <GoBack />
        </div>
        <div className="grid place-content-center text-[2rem] text-pgnavy dark:text-pggreen gap-[3rem]">
          <Link href="/Paintings">Paintings List</Link>
          <Link href="/Gallery">Add Painting</Link>
          <Link href="/Update">Update Painting</Link>
          <Link href="/Delete">Delete Painting</Link>
        </div>
      </main>
    </>
  );
}
