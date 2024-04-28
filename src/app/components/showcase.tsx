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
    <div className="grid justify-items-center my-[3rem]">
      {paintings.map((paint: IPainting, index: number) => (
        <div
          key={index}
          className="grid grid-cols-1 grid-rows-[repeat(1,61vw)] w-[84vw] h-[22rem]"
        >
          <Image
            src={paint.image}
            alt={`${paint.name}`}
            width={0}
            height={0}
            priority
            placeholder="empty"
            className="w-full max-h-full rounded-xl object-cover"
          />
        </div>
      ))}
    </div>
  );
}
