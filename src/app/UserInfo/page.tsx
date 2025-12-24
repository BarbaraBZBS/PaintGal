"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function UserInfo() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  return (
    <>
      {session?.user?.role === "user" ? (
        cart.length > 0 ? (
          <div className="grid h-264 place-content-center grid-rows-[50%_25%_25%] gap-4 text-[clamp(1.5rem,3vw,1.8rem)] my-8">
            <div className="grid place-content-center gap-[2rem]">
              <h1 className="text-[clamp(3rem,3vw,3.5rem)]">
                {session?.user?.firstName}
              </h1>
              <p className="">{session?.user?.lastName}</p>
              <p className="">{session?.user?.email}</p>
              <p className="">{session?.user?.address}</p>
              <p className="">{session?.user?.phone}</p>
            </div>
            <div className="grid text-center">
              <p className="font-medium text-[clamp(1.7rem,3vw,2rem)]">
                You have{" "}
                {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}{" "}
                items in your cart.
              </p>
              <motion.div
                whileTap={{ scale: 0.8, animationDuration: 0.1 }}
                className="cursor-pointer text-[1.5rem]"
              >
                <Link
                  href="/Cart"
                  className="p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
                >
                  My Cart
                </Link>
              </motion.div>
            </div>
            <div className="grid text-center">
              <p className="font-medium text-[clamp(1.7rem,3vw,2rem)]">
                Need to update your account?
              </p>
              <motion.div
                whileTap={{ scale: 0.8, animationDuration: 0.1 }}
                className="cursor-pointer text-[1.5rem]"
              >
                <Link
                  href="/AccountUpdate"
                  className="p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
                >
                  Modify Account
                </Link>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid h-[54rem] place-content-center grid-rows-[70%_25%] gap-[2rem] text-[clamp(1.5rem,3vw,1.8rem)] mb-5">
            <div className="grid place-content-center gap-[2rem]">
              <h1 className="text-[clamp(3rem,3vw,3.5rem)] mb-[1.5rem]">
                {session?.user?.firstName}
              </h1>
              <p className="">{session?.user?.lastName}</p>
              <p className="">{session?.user?.email}</p>
              <p className="">{session?.user?.address}</p>
              <p className="">{session?.user?.phone}</p>
            </div>
            <div className="grid text-center">
              <p className="font-medium text-[clamp(1.7rem,3vw,2rem)] mb-[1rem]">
                Need to update your account?
              </p>
              <motion.div
                whileTap={{ scale: 0.8, animationDuration: 0.1 }}
                className="cursor-pointer text-[1.5rem]"
              >
                <Link
                  href="/AccountUpdate"
                  className="p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
                >
                  Modify Account
                </Link>
              </motion.div>
            </div>
          </div>
        )
      ) : (
        <div className="grid h-[40rem] place-self-center place-content-center gap-[2rem] text-[clamp(1.5rem,3vw,1.8rem)]">
          <h1 className="text-[clamp(3rem,3vw,3.5rem)] mb-[1.5rem]">
            {session?.user?.firstName}
          </h1>
          <p className="">{session?.user?.lastName}</p>
          <p className="">{session?.user?.email}</p>
          <p className="">{session?.user?.address}</p>
          <p className="">{session?.user?.phone}</p>
        </div>
      )}
    </>
  );
}
