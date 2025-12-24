"use client";
import React from "react";
import { useAnimate } from "motion/react";
import { useRouter } from "next/navigation";

export default function PurchaseButton({
  children,
  painting,
}: {
  children: React.ReactNode;
  painting: { _id: string; name: string; price: number };
}) {
  const [scope, animate] = useAnimate();
  const router = useRouter();

  const handleClick = () => {
    //console.log("clicked");
    animate([
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
    ]);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex(
      (item: any) => item.id === painting._id
    );
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({
        id: painting._id,
        name: painting.name,
        price: painting.price,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    
    setTimeout(() => {
      alert("Item added to cart!");
    router.push("/");
    }, 600);
  };

  return (
    <div ref={scope}>
      <button
        className={`cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-orange-300 '}`}
        onClick={(e) => handleClick()}
      >
        <h2 className=" uppercase text-[1.6rem] drop-shadow-darkenTxt">
          {children}
        </h2>
      </button>
    </div>
  );
}
