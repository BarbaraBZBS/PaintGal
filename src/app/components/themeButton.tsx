"use client";
import { useTheme } from "next-themes";
import { motion, spring as springAnimationGeneratorType } from "motion/react";

const springAnimation = {
  type: springAnimationGeneratorType,
  stiffness: 200,
  damping: 30,
};

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleSwitch = () =>
    setTheme(resolvedTheme === "light" ? "dark" : "light");

  return (
    <div className="flex items-center justify-center">
      <div
        aria-label={
          resolvedTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"
        }
        title={
          resolvedTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"
        }
        data-ison={resolvedTheme}
        className={`flex justify-start bg-pgmauve rounded-[5rem] p-[0.25rem] w-[2.8rem] h-[2rem] cursor-pointer data-[ison=dark]:justify-end data-[ison=dark]:bg-pgseethrough`}
        onClick={toggleSwitch}
      >
        <motion.div
          data-ison={resolvedTheme}
          className="bg-pgblue rounded-[4rem] w-[1.5rem] h-[1.5rem] data-[ison=dark]:bg-white"
          layout
          transition={{...springAnimation}}
          whileHover={{ scale: 1.2 }}
        />
      </div>
    </div>
  );
}
