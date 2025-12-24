"use client";
import React, { useState } from "react";
import SubmitButton from "@src/app/components/submitButton";
import FileResizer from "react-image-file-resizer";
import { useRouter } from "next/navigation";

export default function UpdatePaintingForm({ ...painting }) {
  const [fileUrl, setFileUrl] = useState<File | undefined>();
  const [state, setState] = useState();
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(false);
  const isDisabled =
    !fileUrl && !name && !artist && !category && !price && !description;
  const router = useRouter();

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
        500,
        500
      );
    });

  const getImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (
        event.currentTarget.files &&
        event.currentTarget.files[0].type === "image/gif"
      ) {
        setFileUrl(undefined);
        return alert("Gif file is not allowed");
      } else if (
        event.currentTarget.files &&
        !event.currentTarget.files[0].type.startsWith("image/")
      ) {
        setFileUrl(undefined);
        return alert("Only images are allowed");
      } else {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
          const picked = event.currentTarget.files[0];
          //console.log("resize file : ", picked);
          const img: File = (await resizeFile(picked)) as unknown as File;
          setFileUrl(img);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    let myData;
    try {
      if (fileUrl) {
        data = new FormData();
        data.set("image", fileUrl);
        data.append("name", name);
        data.append("artist", artist);
        data.append("category", category);
        data.append("description", description);
        data.append("price", price);
        data.append("onSale", JSON.stringify(onSale));
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/paintings/${painting._id}`,
          {
            method: "PUT",
            body: data,
          }
        );
        myData = await res.json();
      } else {
        data = {
          name: name,
          artist: artist,
          category: category,
          description: description,
          price: price,
          onSale: onSale,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/paintings/${painting._id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: headers,
          }
        );
        myData = await res.json();
      }
      setState(myData.message);
      setName("");
      setArtist("");
      setDescription("");
      setCategory("");
      setPrice("");
      setFileUrl(undefined);
      (document.getElementById("UpdateForm") as HTMLFormElement).reset();
      router.push("/Update");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      id="UpdateForm"
      onSubmit={onSubmit}
      className="text-[clamp(1.6rem,3vw,1.8rem)] font-medium text-indigo-800 dark:text-violet-200 grid grid-rows-[repeat(2,1fr_1fr_1fr_1fr_2fr)] w-[60vw]"
    >
      <div className="place-self-center text-orange-600">{state}</div>
      <input
        className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        type="text"
        name="name"
        placeholder={painting.name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        type="text"
        name="artist"
        placeholder={painting.artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <div className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4">
        <label
          htmlFor="categories"
          className="uppercase"
        >
          Category Chosen
        </label>
        <select
          className="ml-[1.5rem]"
          name="category"
          id="categories"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">{painting.category}</option>
          <option value="Nature">Nature</option>
          <option value="Animal">Animals</option>
          <option value="People">People</option>
          <option value="Fruits">Fruits</option>
          <option value="Abstract">Abstract</option>
          <option value="Landscape">Landscape</option>
          <option value="Technology">Technology</option>
          <option value="Objects">Objects</option>
          <option value="Space">Space</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <textarea
        className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        name="description"
        placeholder={painting.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        type="text"
        name="price"
        placeholder={`$ ${painting.price}`}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4">
        <label className="uppercase">Put on Sale ?</label>
        <input
          type="radio"
          name="onSale"
          value="false"
          defaultChecked={painting.onSale === false ? true : false}
          onClick={() => setOnSale(false)}
          className="text-emerald-400 ml-[1.5rem]"
        />
        <label
          htmlFor="notOnSale"
          className="m-[0.2rem]"
        >
          No
        </label>
        <input
          type="radio"
          name="onSale"
          value="true"
          defaultChecked={painting.onSale === false ? false : true}
          onClick={() => setOnSale(true)}
          className="text-emerald-400 ml-[1.5rem]"
        />
        <label
          htmlFor="onSale"
          className="m-[0.2rem]"
        >
          Yes
        </label>
      </div>
      <input
        className="bg-zinc-200 dark:bg-zinc-800 rounded-3xl self-center w-full file:mr-6 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-50 file:text-violet-700 dark:file:bg-indigo-600 dark:file:text-indigo-300 dark:hover:file:bg-indigo-300 hover:file:bg-violet-200 hover:file:text-violet-800 dark:hover:file:text-indigo-800 "
        type="file"
        name="image"
        onChange={getImg}
      />
      <label
        htmlFor="image"
        className="truncate el-rtl place-content-center"
      >
        {painting.image}
      </label>
      <div className="place-self-center mb-[1rem] mt-[1rem]">
        <SubmitButton isDisabled={isDisabled}>Update</SubmitButton>
      </div>
    </form>
  );
}
