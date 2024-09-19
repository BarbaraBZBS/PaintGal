"use client";
import React, { useState } from "react";
import SubmitButton from "@src/app/components/submitButton";
import FileResizer from "react-image-file-resizer";

// req.params id = painting id

export default function UpdatePaintingForm() {
  const [fileUrl, setFileUrl] = useState<File | undefined>();
  const [state, setState] = useState();
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(false);
  const isDisabled = !fileUrl && !name && !artist && !category && !price;

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
    //if (!fileUrl) return;

    //________________________________________________________________
    //if(fileUrl or file...)

    //________________________________________________________________
    try {
      const data = new FormData();
      //  data.set("image", fileUrl);
      data.append("name", name);
      data.append("artist", artist);
      data.append("category", category);
      data.append("description", description);
      data.append("price", price);
      data.append("onSale", JSON.stringify(onSale));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/paintings`, {
        method: "POST",
        body: data,
      });
      const myData = await res.json();
      setState(myData.message);
      setName("");
      setArtist("");
      setDescription("");
      setCategory("");
      setPrice("");
      setFileUrl(undefined);
      (document.getElementById("SubmitForm") as HTMLFormElement).reset();
      setTimeout(() => {
        setState(undefined);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      id="SubmitForm"
      onSubmit={onSubmit}
      className="px-[1.2rem] border border-gray-700 rounded-xl text-[1.4rem] text-blue-600 dark:text-violet-200 grid grid-rows-[repeat(9,1fr)] gap-[0.3rem]"
    >
      <div className="max-h-[4rem] self-center text-center">{state}</div>
      <input
        className=""
        type="text"
        name="name"
        placeholder="Name"
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        required
        onChange={(e) => setArtist(e.target.value)}
      />
      <div className="self-center">
        <label
          htmlFor="categories"
          className="uppercase"
        >
          Choose Category
        </label>
        <select
          className="ml-[1.5rem]"
          name="category"
          id="categories"
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">--Category--</option>
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
        //or input type="text"
        name="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        required
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="self-center">
        <label className="uppercase">Put on Sale ?</label>
        <input
          type="radio"
          name="onSale"
          value="false"
          defaultChecked
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
        className="self-center w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        type="file"
        name="image"
        onChange={getImg}
      />
      <div className="place-self-center mb-[0.5rem]">
        <SubmitButton isDisabled={isDisabled}>Add</SubmitButton>
      </div>
    </form>
  );
}
