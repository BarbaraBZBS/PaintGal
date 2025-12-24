import DeletePainting from "@src/app/components/deletePainting";

//ADMIN


export const revalidate = 10;

const Delete = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const fetchPainting = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API + `/paintings/${id}`,
      {}
    );
    const painting = await res.json();
    return painting;
  };
  const painting = await fetchPainting();

  return (
    <div className="grid w-screen">

      <main className="grid grid-rows-[40%_60%] place-content-center self-center h-[35rem]">
        <h1 className=" text-[clamp(1.7rem,3vw,2rem)] uppercase text-center place-content-center">
          Delete <em>&quot;{painting.name}&quot;</em> ?
        </h1>
        <DeletePainting {...painting} />
      </main>
    </div>
  );
};

export default Delete;
