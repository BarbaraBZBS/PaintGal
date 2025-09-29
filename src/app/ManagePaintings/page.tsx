import React from "react";
import Link from "next/link";
import GoBack from "@src/app/components/goBack";

//ADMIN PAGE -
//if admin, add this admin page link to nav
export default function ManagePaintings() {
  return (
    <>
      <main className="mt-10 p-2 h-[40rem] grid grid-rows-5 text-[2rem] text-center text-pgnavy dark:text-pggreen">
        <div className="grid justify-items-end max-h-[5rem]">
          <GoBack />
        </div>
        <Link href="/Paintings">Paintings List</Link>
        <Link href="/Gallery">Add Painting</Link>
        <Link href="/Update">Update Painting</Link>
        <Link href="/Delete">Delete Painting</Link>
      </main>
    </>
  );
}
