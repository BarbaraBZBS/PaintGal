import React from "react";
import UpdatePaintingForm from "@src/app/components/updatePaintingForm";

export const revalidate = 10;

export default function Update() {
  return (
    <main className="grid h-[45rem] w-[80vw] mt-[5rem] grid-rows-[8%_92%] place-self-center mb-[2rem]">
      <h1 className="text-[1.7rem] uppercase text-center">Add a new Piece</h1>
      <UpdatePaintingForm />
    </main>
  );
}
