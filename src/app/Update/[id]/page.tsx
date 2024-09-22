import React from "react";
import UpdatePaintingForm from "@src/app/components/updatePaintingForm";

export const revalidate = 10;

type PaintingUpdDetailProp = {
  params: PaintingUpdDetailParam;
};

type PaintingUpdDetailParam = {
  id: string;
};

const Update: React.FC<PaintingUpdDetailProp> = async (
  props: PaintingUpdDetailProp
) => {
  const { id } = props.params;
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
    <main className="grid h-[45rem] w-[80vw] mt-[5rem] grid-rows-[8%_92%] place-self-center mb-[2rem]">
      <h1 className="text-[1.7rem] uppercase text-center">
        Update <em>&quot;{painting.name}&quot;</em>
      </h1>
      <UpdatePaintingForm {...painting} />
    </main>
  );
};

export default Update;
