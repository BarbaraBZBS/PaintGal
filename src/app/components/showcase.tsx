import React from "react";
import Carousel from "./carousel";
import { IPainting } from "../models/painting";

export default async function Showcase() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 180 },
    });
    const paintings = await res.json();
    return paintings.paintings;
  };
  const paintings = await fetchPaintings();

  //  grouping by categories
  const sorting = (cat: string) => {
    let arr = new Array<IPainting>();
    paintings.map((painting: IPainting) => {
      if (painting.category === cat) {
        arr.push(painting);
      }
    });
    return arr;
  };
  const natures = sorting("Nature");
  const animals = sorting("Animal");
  const peoples = sorting("People");
  const fruits = sorting("Fruits");
  const abstracts = sorting("Abstract");
  const landscapes = sorting("Landscape");
  const technologies = sorting("Technology");
  const objects = sorting("Objects");
  const spaces = sorting("Space");
  const others = sorting("Other");

  return (
    <div className="grid justify-items-center my-[3rem]">
      {/* if no data */}
      {paintings && paintings.length == 0 && (
        <p className="h-[5rem] grid place-items-center text-[1.6rem]">
          Nothing in store
        </p>
      )}
      <Carousel paintings={natures} />
      <Carousel paintings={animals} />
      <Carousel paintings={peoples} />
      <Carousel paintings={fruits} />
      <Carousel paintings={abstracts} />
      <Carousel paintings={landscapes} />
      <Carousel paintings={technologies} />
      <Carousel paintings={objects} />
      <Carousel paintings={spaces} />
      <Carousel paintings={others} />
    </div>
  );
}
