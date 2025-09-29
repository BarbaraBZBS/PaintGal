import React from "react";
import Image from "next/image";

export const revalidate = 10;

const Detail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const fetchPainting = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API + `/paintings/${id}`,
        {
          next: { revalidate: 10 },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const painting = await res.json();
      return painting;
    } catch (error) {
      console.error("Error fetching painting:", error);
      return null;
    }
  };

  const paint = await fetchPainting();

  if (paint) {
    return (
      <main className="grid h-[60vh] w-[80vw] mt-[5rem] grid-rows-[15%_35%_50%] justify-self-center">
        {/* for admins */}
        {/* <button className="" onClick(push Update/id)>Update</button */}

        <h1 className="text-[1.7rem] uppercase text-center">{paint.name}</h1>
        <div className="">
          <p>&quot;{paint.description}&quot;</p>
          <h3>By {paint.artist}</h3>
          <p>
            <span>$ </span>
            {paint.price}
          </p>
          <p>{paint.onSale === true ? "On Sale!" : ""}</p>
          <p>Category : {paint.category}</p>
          <p>{paint.isNewPiece === true ? "NEW" : ""}</p>
        </div>

        {/*<button>Add to Cart</button>*/}

        <Image
          src={paint.image}
          alt={`${paint.name}`}
          width={0}
          height={0}
          priority
          placeholder="empty"
          className="w-full h-full rounded-xl object-cover"
        />
      </main>
    );
  } else {
    return (
      <div className="grid h-[60vh] w-[80vw] mt-[5rem] grid-rows-[15%_35%_50%] justify-self-center">
        <p>Painting details could not be loaded</p>
      </div>
    );
  }
};

export default Detail;
