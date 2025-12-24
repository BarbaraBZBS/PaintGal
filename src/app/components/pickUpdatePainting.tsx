"use client";
import { IPainting } from "../models/painting";
import { useRouter } from "next/navigation";
import { Types } from "mongoose";


const PickUpdatePainting = ({ ...paintings }) => {
  const router = useRouter();
  const handleClick = (id: Types.ObjectId) => {
    router.push(`Update/${id}`);
  };

  return (
    <div className="grid w-screen my-[3rem]">

      {paintings?.paintings.length > 0 && (
        <>
          <h1 className="text-[clamp(1.7rem,3vw,2rem)] uppercase text-center font-semibold mb-[5rem]">
            Paintings (Update)
          </h1>
          {paintings?.paintings.map((paint: IPainting, index: number) => (
            <div
              key={index}
              className="border-[0.1rem] p-2 m-2 lg:mx-16 cursor-pointer text-[clamp(1.4rem,3vw,1.6rem)]"
              onClick={() => handleClick(paint._id)}
            >
              <h2 className="text-[clamp(1.6rem,3vw,1.8rem)] text-pgnavy dark:text-pggreen">
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
