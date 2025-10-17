import React from "react";
import AddPaintingForm from "@src/app/components/addPaintingForm";
import GoBack from "../components/goBack";

//ADMIN PAGE -

export const revalidate = 10;

export default function Gallery() {
  return (
    <>
      <div className="grid justify-items-end h-[5rem] m-[2rem]">
        <GoBack />
      </div>

      <main className="grid w-[80vw] md:w-[70vw] grid-rows-[3%_83%_1%] place-self-center pb-[2rem]">
        <h1 className="text-[1.7rem] uppercase text-center place-content-center">
          Add a new Piece
        </h1>
        <AddPaintingForm />
      </main>
    </>
  );
}
