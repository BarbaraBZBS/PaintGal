"use client";
import React, { useEffect, useState } from "react";
import { IPainting } from "../models/painting";
import Image from "next/image";
import { motion, spring, useMotionValue } from "framer-motion";
import NavButton from "./navButton";

const DRAG_BUFFER = 50;

const DRAG_OPTIONS = { type: spring, mass: 7, stiffness: 400, damping: 50 };

const Carousel = ({ ...paintings }) => {
  const [drag, setDrag] = useState(false);
  const [ImgIdx, setImgIdx] = useState(0);
  const dragX = useMotionValue(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const onDragStart = () => {
    console.log(drag);
    setDrag(true);
  };

  const onDragEnd = () => {
    setDrag(false);
    console.log(dragX.get());

    const x = dragX.get();

    if (x <= DRAG_BUFFER && ImgIdx < paintings?.paintings.length - 1) {
      setImgIdx((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && ImgIdx > 0) {
      setImgIdx((pv) => pv - 1);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* each category paintings display carousel */}
      {paintings?.paintings.length > 0 && (
        <>
          <h1 className="uppercase mt-[1.5rem] text-[1.5rem]">
            {paintings?.paintings[0].category}
          </h1>

          <div className="relative w-[84vw] min-h-[22.5rem] overflow-hidden py-[2rem]">
            <motion.div
              drag="x"
              dragPropagation
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragX }}
              animate={{
                translateX: `-${ImgIdx * 100}%`,
              }}
              transition={{ ...DRAG_OPTIONS }}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              className="flex items-center cursor-grab active:cursor-dragging"
            >
              {paintings?.paintings.map((paint: IPainting, index: number) => (
                <motion.div
                  key={index}
                  className="aspect-video w-full h-full shrink-0"
                  animate={{
                    scale: ImgIdx === index ? 0.96 : 0.9,
                    opacity: ImgIdx === index ? 1 : 0.3,
                  }}
                  transition={{ ...DRAG_OPTIONS }}
                >
                  {isLoaded && (
                    <div className="relative w-full h-full">
                      <Image
                        draggable={false}
                        src={paint.image}
                        alt={`${paint.name}`}
                        width={0}
                        height={0}
                        priority
                        placeholder="empty"
                        className="w-full h-full rounded-xl object-cover"
                      />
                      <div className="absolute bottom-[1rem] left-[0.5rem]">
                        <NavButton id={paint._id}>
                          <h2 className="uppercase text-[1.2rem] drop-shadow-darkenTxt">
                            {paint.artist}
                          </h2>
                          <h3 className="uppercase text-[1.2rem] drop-shadow-darkenTxt">
                            {paint.name}
                          </h3>
                        </NavButton>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            {paintings?.paintings.length > 1 && (
              <div className="mt-[1.6rem] flex w-full justify-center gap-[0.8rem]">
                {paintings?.paintings.map((_: IPainting, index: number) => (
                  <motion.button
                    key={index}
                    animate={{
                      scale: index === ImgIdx ? [1, 1.3, 1.3, 1] : 1,
                      rotate: index === ImgIdx ? [0, 0, 270, 270] : 0,
                      borderRadius:
                        index === ImgIdx ? ["20%", "20%", "50%", "50%"] : "50%",
                    }}
                    whileHover={{ scale: 1.3 }}
                    className={`flex items-center justify-center rounded-full p-[0.25rem] w-[1.2rem] h-[1.2rem] ${
                      index === ImgIdx ? "bg-pgmauve" : "bg-pgseethrough"
                    } cursor-pointer`}
                    onClick={() => setImgIdx(index)}
                  ></motion.button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Carousel;
