import React from "react";
import Link from "next/link";
import GoBack from "@src/app/components/goBack";

//ADMIN PAGE -
//if admin, add this admin page link to nav
export default function ManagePaintings() {
  return (
    <>
      <main className="h-[40rem]">
        <div className="grid justify-items-end mb-[5rem]">
          <GoBack />
        </div>
        <div className="grid text-center text-[2rem] text-pgnavy dark:text-pggreen  gap-[4rem]">
          <Link href="/Paintings">Paintings List</Link>
          <Link href="/Gallery">Add Painting</Link>
          <Link href="/Update">Update Painting</Link>
          <Link href="/Delete">Delete Painting</Link>
        </div>
      </main>
    </>
  );
}
