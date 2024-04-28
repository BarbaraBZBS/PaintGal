import React from "react";
import AddPaintingForm from "@src/app/components/addPaintingForm";

export const revalidate = 10;

export default function Gallery() {
  return (
    <main>
      <h1>Add a new Piece</h1>
      <AddPaintingForm />
    </main>
  );
}
