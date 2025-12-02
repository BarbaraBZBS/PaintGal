import React from "react";
import Image from "next/image";
import PurchaseButton from "@src/app/components/purchaseButton";

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

  //full month discount
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let nextMonth = ((new Date().getMonth() + 1) % 12) + 1;
  let stringMonth = months[nextMonth];

  //few days discount
  let currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
  });

  if (paint) {
    return (
      <main className="grid h-[65vh] lg:h-[90vh] lg:min-h-[80vh] w-[80vw] mt-[5rem] grid-rows-[10%_25%_45%_20%] lg:grid-rows-[8%_20%_60%_12%] justify-self-center">
        <h1 className="text-[1.7rem] uppercase text-center font-semibold">
          {paint.name}
        </h1>
        <div className="text-[1.4rem] lg:text-[1.55rem]">
          <p>&quot;{paint.description}&quot;</p>
          <h3>By {paint.artist}</h3>
          <p>
            <span>$ </span>
            {paint.price}
          </p>
          <p className="text-green-800 dark:text-pggreen">
            {paint.onSale === true ? `On Sale until ${currentDate} 30th!` : ""}
          </p>
          <p>Category : {paint.category}</p>
          <p>{paint.isNewPiece === true ? "NEW" : ""}</p>
        </div>

        <Image
          src={paint.image}
          alt={`${paint.name}`}
          width={0}
          height={0}
          priority
          placeholder="empty"
          className="w-full h-full rounded-xl object-cover"
        />

        <div className="place-self-center">
          <PurchaseButton
            children="Buy"
            id={paint._id}
          />
        </div>
      </main>
    );
  } else {
    return (
      <div className="grid">
        <p>Painting details could not be loaded</p>
      </div>
    );
  }
};

export default Detail;
