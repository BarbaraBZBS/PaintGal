import React from "react";
import PickUpdatePainting from "../components/pickUpdatePainting";

//ADMIN


export default async function Update() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 10 },
      //or cache: "no-store",
    });
    const paintings = await res.json();
    return paintings.paintings;
  };
  const paintings = await fetchPaintings();

  return <PickUpdatePainting paintings={paintings} />;
}
