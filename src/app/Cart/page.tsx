"use client";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter } from "@node_modules/next/navigation";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const groupedCart: CartItem[] = [];
    storedCart.forEach((item: any) => {
      const existing = groupedCart.find((g) => g.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        groupedCart.push({ ...item, quantity: item.quantity || 1 });
      }
    });
    setCart(groupedCart);
  }, []);

  console.log(cart);

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    // Save back to localStorage as flat array
    const flatCart = newCart.flatMap((item) =>
      Array(item.quantity).fill({
        id: item.id,
        name: item.name,
        price: item.price,
      })
    );
    localStorage.setItem("cart", JSON.stringify(flatCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const doCheckout = async () => {
    setTimeout(() => {
      localStorage.clear();
      router.push("/Checkout");
    }, 600);
  };

  return (
    <div className="grid place-content-center">
      <h1 className="text-[clamp(2rem,3vw,2.4rem)] font-bold mb-8">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 items-center border-b pb-4"
              >
                <div>
                  <h2 className="text-[clamp(1.3rem,3vw,1.7rem)] font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-[clamp(1rem,3vw,1.4rem)]">
                    ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div>
                <motion.button
                whileTap={{ scale: 0.8}}
                  onClick={() => removeFromCart(index)}
                  className="text-[clamp(1rem,3vw,1.4rem)] bg-red-500 text-white px-[1rem] py-2 rounded hover:bg-red-600"
                >
                  Remove One
                </motion.button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] font-bold">
              Total: ${total.toFixed(2)}
            </h2>
          </div>
        </>
      )}
      {cart.length > 0 && (
      <div className="place-self-center mt-10 mb-[1rem]">
        <motion.button
          whileTap={{ scale: 0.8, animationDuration: 0.1 }}
          className="text-[clamp(1.6rem,3vw,2rem)] bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={doCheckout}
        >
          Checkout
        </motion.button>
      </div>        
      )}
    </div>
  );
}
