import React from "react";
import { IPainting } from "../models/painting";

//admin page
export default async function Paintings() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 180 },
      //or cache: "no-store",
    });
    const paintings = await res.json();
    return paintings;
  };

  const paintings = await fetchPaintings();

  return (
    <div>
      <h1>Paintings</h1>
      {paintings.map((paint: IPainting, index: number) => (
        <div key={index}>
          <h2>{paint.name}</h2>
          <h3>{paint.artist}</h3>
          <p>{paint.category}</p>
          <p>{paint.description}</p>
          <p>
            <span>$</span>
            {paint.price}
          </p>
          <p>{paint.image}</p>
          {/*<img
            src={paint.image}
            alt="painting image"
          />*/}
          <p>{paint.isNewPiece}</p>
          <p>{paint.onSale}</p>
        </div>
      ))}
    </div>
  );
}
