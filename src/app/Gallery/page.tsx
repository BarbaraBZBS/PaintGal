import AddPaintingForm from "@src/app/components/addPaintingForm";

//ADMIN


export const revalidate = 10;

export default function Gallery() {
  return (
    <div className="grid w-screen">

      <main className="grid grid-rows-[6%_86%] place-content-center h-[65rem]">
        <h1 className="text-[clamp(1.7rem,3vw,2rem)] uppercase text-center place-content-center">
          Add a new Piece
        </h1>
        <AddPaintingForm />
      </main>
    </div>
  );
}
