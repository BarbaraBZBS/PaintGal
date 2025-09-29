"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, spring as springAnimationGeneratorType } from "framer-motion";

const springAnimation = {
  type: springAnimationGeneratorType,
  stiffness: 700,
  damping: 30,
};

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  //const [mounted, setMounted] = useState(false);

  const toggleSwitch = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  //useEffect(() => {
  //  setMounted(true);
  //}, []);
  //if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <div
        aria-label={
          resolvedTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
        }
        title={
          resolvedTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
        }
        data-ison={resolvedTheme}
        className={`flex justify-start bg-pgseethrough rounded-[5rem] p-[0.25rem] w-[2.8rem] h-[2rem] cursor-pointer data-[ison=light]:justify-end data-[ison=light]:bg-pgmauve`}
        onClick={toggleSwitch}
      >
        <motion.div
          data-ison={resolvedTheme}
          className="bg-white rounded-[4rem] w-[1.5rem] h-[1.5rem] data-[ison=light]:bg-pgblue"
          layout
          transition={{ ...springAnimation }}
          whileHover={{ scale: 1.2 }}
        />
      </div>
    </div>
  );
}
