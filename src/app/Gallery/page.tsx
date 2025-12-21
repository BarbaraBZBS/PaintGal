import AddPaintingForm from "@src/app/components/addPaintingForm";
import GoBack from "../components/goBack";
import ManagePaintingsButton from "../components/managePaintingsButton";

//ADMIN


export const revalidate = 10;

export default function Gallery() {
  return (
    <>
      <div className="grid grid-cols-[repeat(2,13rem)] justify-between mb-[3rem]">
        <GoBack />
        <ManagePaintingsButton />
      </div>

      <main className="grid grid-rows-[6%_86%] place-content-center mb-[2rem]">
        <h1 className="text-[1.7rem] uppercase text-center place-content-center">
          Add a new Piece
        </h1>
        <AddPaintingForm />
      </main>
    </>
  );
}
