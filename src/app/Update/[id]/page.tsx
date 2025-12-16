import React from "react";
import UpdatePaintingForm from "@src/app/components/updatePaintingForm";
import GoBack from "@src/app/components/goBack";
import ManagePaintingsButton from "@src/app/components/managePaintingsButton";

//ADMIN PAGE -

export const revalidate = 10;

//type PaintingUpdDetailProp = {
//  params: PaintingUpdDetailParam;
//};
//
//type PaintingUpdDetailParam = {
//  id: string;
//};

const Update = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const fetchPainting = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + `/paintings/${id}`, {
      //next: { revalidate: 20 },
    });
    const painting = await res.json();
    return painting;
  };
  const painting = await fetchPainting();
  //console.log(painting);

  return (
    <>
      <div className="grid grid-cols-[repeat(2,13rem)] justify-between mb-[3rem]">
        <GoBack />
        <ManagePaintingsButton />
      </div>

      <main className="grid w-[80vw] md:w-[70vw] grid-rows-[6%_86%] place-self-center mb-[2rem]">
        <h1 className="text-[1.7rem] uppercase text-center place-content-center">
          Update <em>&quot;{painting.name}&quot;</em>
        </h1>
        <UpdatePaintingForm {...painting} />
      </main>
    </>
  );
};

export default Update;
