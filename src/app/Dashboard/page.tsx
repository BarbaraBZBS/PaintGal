import Link from "next/link";

//ADMIN


export default function ManagePaintings() {
  return (
      <main className="grid w-screen">
        <div className="grid h-[45rem] place-content-center text-[clamp(2rem,4vw,2.5rem)] text-pgnavy dark:text-pggreen gap-[3rem]">
          <Link href="/Paintings">Paintings List</Link>
          <Link href="/Gallery">Add Painting</Link>
          <Link href="/Update">Update Painting</Link>
          <Link href="/Delete">Delete Painting</Link>
        </div>
      </main>
  );
}
