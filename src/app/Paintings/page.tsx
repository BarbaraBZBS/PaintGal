import { IPainting } from "../models/painting";

//ADMIN


export default async function Paintings() {
  const fetchPaintings = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API + "/paintings", {
      next: { revalidate: 10 },
      //or cache: "no-store",
    });
    const paintings = await res.json();
    return paintings.paintings;
  };

  const paintings = await fetchPaintings();

  return (
    <div className="grid w-screen my-[3rem]">

      <h1 className="text-[clamp(1.7rem,3vw,2rem)] uppercase font-semibold text-center mb-[5rem]">
        Paintings
      </h1>
      {paintings.map((paint: IPainting, index: number) => (
        <div
          key={index}
          className="border-[0.1rem] p-2 m-2 lg:mx-16 text-[clamp(1.4rem,3vw,1.8rem)]"
        >
          <h2 className="text-[clamp(1.6rem,3vw,1.8rem)] text-pgnavy dark:text-pggreen underline">
            {paint.name}
          </h2>
          <h3>By {paint.artist}</h3>
          <p>{paint.category}</p>
          <p>"{paint.description}"</p>
          <p>
            <span>$</span>
            {paint.price}
          </p>
          <p
            className="max-w-[34rem] md:max-w-full el-rtl truncate text-left">
            {paint.image}
          </p>
          <p>New : {paint.isNewPiece ? "YES" : "NO"}</p>
          <p>On Sale : {paint.onSale ? "YES" : "NO"}</p>
        </div>
      ))}
    </div>
  );
}
