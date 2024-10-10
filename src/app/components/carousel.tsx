"use client";
import React, { useState } from "react";
import { IPainting } from "../models/painting";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

const DRAG_BUFFER = 50;

const DRAG_OPTIONS = { type: "spring", mass: 7, stiffness: 400, damping: 50 };

const Carousel = ({ ...paintings }) => {
  const [drag, setDrag] = useState(false);
  const [ImgIdx, setImgIdx] = useState(0);
  const dragX = useMotionValue(0);

  //  sort by categories
  let natures = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Nature") {
      return natures.push(painting);
    }
  });
  let animals = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Animals") {
      return animals.push(painting);
    }
  });
  let peoples = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "People") {
      return peoples.push(painting);
    }
  });
  let fruits = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Fruits") {
      return fruits.push(painting);
    }
  });
  let abstracts = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Abstract") {
      return abstracts.push(painting);
    }
  });
  let landscapes = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Landscape") {
      return landscapes.push(painting);
    }
  });
  let technologies = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Technology") {
      return technologies.push(painting);
    }
  });
  let objects = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Objects") {
      return objects.push(painting);
    }
  });
  let spaces = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Space") {
      return spaces.push(painting);
    }
  });
  let others = new Array<IPainting>();
  paintings?.paintings.map((painting: IPainting) => {
    if (painting.category === "Other") {
      return others.push(painting);
    }
  });

  const onDragStart = () => {
    console.log(drag);
    setDrag(true);
  };

  const onDragEnd = () => {
    setDrag(false);
    console.log(dragX.get());

    const x = dragX.get();

    if (x <= DRAG_BUFFER && ImgIdx < natures.length - 1) {
      setImgIdx((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && ImgIdx > 0) {
      setImgIdx((pv) => pv - 1);
    }
  };

  const handleClick = () => {
    console.log("clicked");
    //router.push(url/paint.id)
  };

  return (
    <>
      {/* paintings display carousels */}
      {natures.length > 0 && (
        <>
          <h1 className="uppercase my-[1.5rem] text-[1.5rem]">nature</h1>

          <div className="relative w-[84vw] min-h-[22.5rem] overflow-hidden py-[2rem]">
            <motion.div
              drag="x"
              dragPropagation
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragX }}
              animate={{
                translateX: `-${ImgIdx * 100}%`,
              }}
              transition={DRAG_OPTIONS}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              className="flex items-center cursor-grab active:cursor-dragging"
            >
              {natures.map((paint: IPainting, index: number) => (
                <motion.div
                  key={index}
                  //  style={{
                  //    backgroundImage: `url(${paint.image})`,
                  //    backgroundSize: "cover",
                  //    backgroundPosition: "center",
                  //  }}
                  className="aspect-video w-full h-full shrink-0"
                  animate={{ scale: ImgIdx === index ? 0.96 : 0.9 }}
                  transition={DRAG_OPTIONS}
                >
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
                  <div
                    className="absolute uppercase text-[1.2rem] drop-shadow-darkenTxt bottom-[1rem] left-[0.5rem]"
                    onClick={handleClick}
                    //onClick={handleClick(paint.id)}
                  >
                    <h2>{paint.artist}</h2>
                    <h3>{paint.name}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-[1.6rem] flex w-full justify-center gap-[0.8rem]">
              {natures.map((_, index: number) => (
                <button
                  key={index}
                  className={`flex items-center justify-center rounded-full p-[0.25rem] w-[1.2rem] h-[1.2rem] ${
                    index === ImgIdx ? "bg-pgmauve" : "bg-pgseethrough"
                  } cursor-pointer`}
                  onClick={() => setImgIdx(index)}
                >
                  <motion.div
                    className="bg-pgseethrough rounded-full w-[0.8rem] h-[0.8rem]"
                    layout
                    transition={{ type: "spring" }}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1.2 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 1.3 }}
                    whileFocus={{ scale: 1.2 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {animals.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">animal</h1>
      )}
      {animals.length > 0 &&
        animals.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {peoples.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">people</h1>
      )}
      {peoples.length > 0 &&
        peoples.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {fruits.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">fruits</h1>
      )}
      {fruits.length > 0 &&
        fruits.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {abstracts.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">abstract</h1>
      )}
      {abstracts.length > 0 &&
        abstracts.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {landscapes.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">landscape</h1>
      )}
      {landscapes.length > 0 &&
        landscapes.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {technologies.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">technology</h1>
      )}
      {technologies.length > 0 &&
        technologies.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {objects.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">objects</h1>
      )}
      {objects.length > 0 &&
        objects.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {spaces.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">space</h1>
      )}
      {spaces.length > 0 &&
        spaces.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
      {others.length > 0 && (
        <h1 className="uppercase my-[1.5rem] text-[1.5rem]">other</h1>
      )}
      {others.length > 0 &&
        others.map((paint: IPainting, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 w-[84vw] h-[22.5rem]"
          >
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
        ))}
    </>
  );
};

export default Carousel;
