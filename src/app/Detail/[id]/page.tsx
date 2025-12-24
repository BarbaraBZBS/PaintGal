import Image from "next/image";
import PurchaseButton from "@src/app/components/purchaseButton";
import { auth } from "@src/auth";

export const revalidate = 10;

const Detail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const { id } = await params;
  const fetchPainting = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API + `/paintings/${id}`,
        {
          next: { revalidate: 10 },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const painting = await res.json();
      return painting;
    } catch (error) {
      console.error("Error fetching painting:", error);
      return null;
    }
  };

  const paint = await fetchPainting();

  //few days discount
  let currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
  });

  const discount = (price: number) => {
    if (!!paint.onSale) {
      return paint.price - paint.price * 0.2;
    }
    return price;
  };

  if (paint) {
    return (
      <main className="grid grid-rows-[10%_25%_45%_20%] h-[50rem] font-medium lg:h-[90rem] lg:grid-rows-[8%_20%_60%_12%] place-self-center place-content-center m-[2rem]">
        <h1 className="text-[clamp(1.7rem,4vw,2rem)] uppercase text-center place-self-center font-semibold">
          {paint.name}
        </h1>
        <div className="text-[clamp(1.4rem,3vw,1.7rem)] place-self-center">
          <p>&quot;{paint.description}&quot;</p>
          <h3>By {paint.artist}</h3>
          <p>
            <span>$</span>
            {paint.onSale === true ? (
              <>
                {discount(paint.price)} &nbsp;&nbsp;&nbsp;
                <span className="line-through decoration-pgred">
                  &nbsp;${paint.price}&nbsp;
                </span>
                <span>&nbsp;</span>
                <span className="text-[1rem] text-pgred border-[0.1rem] rounded-2xl p-[0.2rem]">
                  -20%
                </span>
              </>
            ) : (
              paint.price
            )}
          </p>
          <p className="text-green-800 dark:text-pggreen">
            {paint.onSale === true ? `On Sale until ${currentDate} 30th!` : ""}
          </p>
          <p>Category : {paint.category}</p>
          <p>{paint.isNewPiece === true ? "NEW" : ""}</p>
        </div>

        <div className="mt-[1rem] px-[2.5rem]">
          <Image
            src={paint.image}
            alt={`${paint.name}`}
            width={0}
            height={0}
            priority
            placeholder="empty"
            className="w-full h-full rounded-xl object-cover"
          />
        </div>

        {session?.user?.role === "user" && (
          <div className="place-self-center">
            <PurchaseButton
              children="Buy"
              painting={{
                _id: paint._id,
                name: paint.name,
                price: discount(paint.price),
              }}
            />
          </div>
        )}
      </main>
    );
  } else {
    return (
      <div className="grid text-[clamp(1.4rem,3vw,1.7rem)]">
        <p>Painting details could not be loaded</p>
      </div>
    );
  }
};

export default Detail;
