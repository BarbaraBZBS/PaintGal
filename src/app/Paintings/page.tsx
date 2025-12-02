import React from "react";
import GoBack from "../components/goBack";
import { IPainting } from "../models/painting";
import ManagePaintingsButton from "../components/managePaintingsButton";

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
    <div className="">
      <div className="flex justify-between mb-[4rem]">
        <GoBack />
        <ManagePaintingsButton />
      </div>
      <div></div>

      <h1 className="text-[1.7rem] uppercase font-semibold text-center mb-[5rem]">
        Paintings
      </h1>
      {paintings.map((paint: IPainting, index: number) => (
        <div
          key={index}
          className="border-[0.1rem] p-2 m-2 text-[1.4rem]"
        >
          <h2 className="text-[1.6rem] text-pgnavy dark:text-pggreen undeline">
            {paint.name}
          </h2>
          <h3>By {paint.artist}</h3>
          <p>{paint.category}</p>
          <p>"{paint.description}"</p>
          <p>
            <span>$</span>
            {paint.price}
          </p>
          <p className="max-w-[34rem] el-rtl truncate text-left">
            {paint.image}
          </p>
          <p>New : {paint.isNewPiece ? "YES" : "NO"}</p>
          <p>On Sale : {paint.onSale ? "YES" : "NO"}</p>
        </div>
      ))}
    </div>
  );
}
