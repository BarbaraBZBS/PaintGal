import React from "react";
import { IPainting } from "../models/painting";
import Image from "next/image";

export default async function Showcase() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 180 },
    });
    const paintings = await res.json();
    return paintings;
  };

  const paintings = await fetchPaintings();

  return (
    <div>
      <h1>Paintings</h1>
      {paintings.map((paint: IPainting, index: number) => (
        <div
          key={index}
          className="grid"
        >
          <Image
            src={paint.image}
            alt={`${paint.name}`}
            width={300}
            height={100}
            priority
            placeholder="empty"
          />
        </div>
      ))}
    </div>
  );
}
