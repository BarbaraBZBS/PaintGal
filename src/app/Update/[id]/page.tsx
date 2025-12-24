import UpdatePaintingForm from "@src/app/components/updatePaintingForm";

//ADMIN


export const revalidate = 10;


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

  return (
    <div className="grid w-screen">

      <main className="grid grid-rows-[6%_86%] place-content-center h-[66rem]">
        <h1 className="text-[clamp(1.7rem,3vw,2rem)] uppercase text-center place-content-center">
          Update <em>&quot;{painting.name}&quot;</em>
        </h1>
        <UpdatePaintingForm {...painting} />
      </main>
    </div>
  );
};

export default Update;
