import React from "react";
import GoBack from "../components/goBack";
import { IPainting } from "../models/painting";

//ADMIN PAGE -

export default async function Paintings() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 10 },
      //or cache: "no-store",
    });
    const paintings = await res.json();
    return paintings.paintings;
  };

  const paintings = await fetchPaintings();

  return (
    <div>
      <div className="flex justify-end">
        <GoBack />
      </div>

      <h1 className="text-[1.7rem] uppercase text-center">Paintings</h1>
      {paintings.map((paint: IPainting, index: number) => (
        <div
          key={index}
          className="border-[0.1rem] p-2 m-2"
        >
          <h2 className="text-[1.5rem] text-pgnavy dark:text-pggreen">
            {paint.name}
          </h2>
          <h3>By {paint.artist}</h3>
          <p>{paint.category}</p>
          <p>"{paint.description}"</p>
          <p>
            <span>$</span>
            {paint.price}
          </p>
          <p>{paint.image}</p>
          <p>New : {paint.isNewPiece ? "true" : "false"}</p>
          <p>On Sale : {paint.onSale ? "true" : "false"}</p>
        </div>
      ))}
    </div>
  );
}
