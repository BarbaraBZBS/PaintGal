import GoBack from "@src/app/components/goBack";
import DeletePainting from "@src/app/components/deletePainting";
import ManagePaintingsButton from "@src/app/components/managePaintingsButton";

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
    <>
      <div className="grid grid-cols-[repeat(2,13rem)] justify-between mb-[4rem]">
        <GoBack />
        <ManagePaintingsButton />
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
