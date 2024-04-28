"use client";

import React, { useState } from "react";
import Button from "@src/app/components/button";

export default function AddPaintingForm() {
  const [file, setFile] = useState<File>();
  const [state, setState] = useState();
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(false);
  const isDisabled = !file || !name || !artist || !category || !price;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("image", file);
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
      setFile(undefined);
      (document.getElementById("SubmitForm") as HTMLFormElement).reset();
      setTimeout(() => {
        setState(undefined);
      }, 4000);
      //  const form_values = Object.fromEntries(data);
      //  console.log("www", form_values);
      if (!res.ok) throw new Error(await res.text());
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        id="SubmitForm"
        onSubmit={onSubmit}
        className="text-blue-500"
      >
        <div>{state}</div>
        <br />
        <input
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
        <br />
        <label htmlFor="categories">Choose Category</label>
        <select
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

        <input
          //or textarea
          type="text"
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
        <p>Put on Sale ?</p>
        <input
          type="radio"
          name="onSale"
          value="false"
          defaultChecked
          onClick={() => setOnSale(false)}
          className="text-emerald-400"
        />
        <label htmlFor="notOnSale">No</label>
        <input
          type="radio"
          name="onSale"
          value="true"
          onClick={() => setOnSale(true)}
          className="text-emerald-400"
        />
        <label htmlFor="onSale">Yes</label>
        <br />
        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <Button isDisabled={isDisabled}>Add</Button>
      </form>
    </div>
  );
}
