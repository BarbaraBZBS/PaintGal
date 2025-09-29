import React from "react";
import GoBack from "@src/app/components/goBack";
import DeletePainting from "@src/app/components/deletePainting";

//ADMIN PAGE -

export const revalidate = 10;

//type PaintingUpdDetailProp = {
//  params: PaintingUpdDetailParam;
//};
//
//type PaintingUpdDetailParam = {
//  id: string;
//};

const Delete = async ({ params }: { params: Promise<{ id: string }> }) => {
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
      <div className="grid justify-items-end">
        <GoBack />
      </div>

      <main className="grid h-[45rem] w-[80vw] mt-[5rem] grid-rows-[8%_92%] place-self-center mb-[2rem]">
        <h1 className="text-[1.7rem] uppercase text-center">
          Delete <em>&quot;{painting.name}&quot;</em> ?
        </h1>
        <DeletePainting {...painting} />
      </main>
    </>
  );
};

export default Delete;
