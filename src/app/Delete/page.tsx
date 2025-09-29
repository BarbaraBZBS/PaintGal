import React from "react";
//import { IPainting } from "../models/painting";
import PickDeletePainting from "../components/pickDeletePainting";

//ADMIN PAGE -

export default async function Delete() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 10 },
      //or cache: "no-store",
    });
    const paintings = await res.json();
    return paintings.paintings;
  };
  const paintings = await fetchPaintings();

  return <PickDeletePainting paintings={paintings} />;
}
