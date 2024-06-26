import React from "react";
import { IPainting } from "../models/painting";
import Image from "next/image";

export default async function Showcase() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 180 },
    });
    const paintings = await res.json();
    return paintings.paintings;
  };
  const paintings = await fetchPaintings();

  return (
    <div className="grid justify-items-center my-[3rem]">
      {paintings && paintings.length == 0 && (
        <p className="h-[5rem] grid place-items-center text-[1.6rem]">
          Nothing in store
        </p>
      )}
      {paintings.length > 0 &&
        paintings.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 grid-rows-[repeat(1,20rem)] w-[84vw] h-[22.5rem]"
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
