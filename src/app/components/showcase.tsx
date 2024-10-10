import React from "react";
import Carousel from "./carousel";

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
      {/* if no data */}
      {paintings && paintings.length == 0 && (
        <p className="h-[5rem] grid place-items-center text-[1.6rem]">
          Nothing in store
        </p>
      )}
      <Carousel paintings={paintings} />
    </div>
  );
}
