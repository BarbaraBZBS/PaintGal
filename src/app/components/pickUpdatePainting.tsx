"use client";
import React from "react";
import { IPainting } from "../models/painting";
import { useRouter } from "next/navigation";
import { ObjectId } from "mongoose";
import GoBack from "./goBack";

//ADMIN PAGE -

const PickUpdatePainting = ({ ...paintings }) => {
  const router = useRouter();
  const handleClick = (id: ObjectId) => {
    //console.log("clicked");
    router.push(`Update/${id}`);
  };

  return (
    <div>
      <div className="grid justify-items-end mb-[4rem]">
        <GoBack />
      </div>

      {paintings?.paintings.length > 0 && (
        <>
          <h1 className="text-[1.7rem] uppercase text-center font-semibold mb-[5rem]">
            Paintings (Update)
          </h1>
          {paintings?.paintings.map((paint: IPainting, index: number) => (
            <div
              key={index}
              className="border-[0.1rem] p-2 m-2 cursor-pointer text-[1.4rem]"
              onClick={() => handleClick(paint._id)}
            >
              <h2 className="text-[1.6rem] text-pgnavy dark:text-pggreen">
                {paint.name}
              </h2>
              <h3>By {paint.artist}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PickUpdatePainting;
