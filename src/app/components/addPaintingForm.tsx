"use client";
import React, { useState } from "react";
import SubmitButton from "@src/app/components/submitButton";
import FileResizer from "react-image-file-resizer";

export default function AddPaintingForm() {
  const [fileUrl, setFileUrl] = useState<File | undefined>();
  const [state, setState] = useState();
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(false);
  const isDisabled = !fileUrl || !name || !artist || !category || !price;

  //JPEG?? or WEBP or PNG??
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
          //console.log("img?????", img);
          //console.log(typeof img);
          setFileUrl(img);
        }
      }
      console.log("final???", fileUrl);
    } catch (err) {
      console.error(err);
    }
  };

  //useEffect(() => {
  //  if (fileUrl) {
  //    resizeFile(fileUrl);
  //    setResized(fileUrl);
  //  }

  //const resizeFile = (fileUrl: File) => {
  //  FileResizer.imageFileResizer(
  //
  //    fileUrl,
  //    360,
  //    240,
  //    "WEBP",
  //    100,
  //    0,
  //    (uri: string | Blob | File | ProgressEvent<FileReader>) => {
  //      console.log(uri.File)
  //    }, "file", 360,
  //    240
  //  );
  //};
  //const resizeFile = (file: File) =>
  //  new Promise((resolve) => {
  //    FileResizer.imageFileResizer(
  //      file,
  //      360,
  //      240,
  //      "WEBP",
  //      50,
  //      0,
  //      (fileUri) => {
  //        resolve(fileUri);
  //      },
  //      "base64",
  //      360,
  //      240
  //    );
  //  });
  //const img = await resizeFile(file);
  //console.log("new resized image : ", img);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileUrl) return;
    try {
      const data = new FormData();
      data.set("image", fileUrl);
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
      //setResized(undefined);
      (document.getElementById("SubmitForm") as HTMLFormElement).reset();
      setTimeout(() => {
        setState(undefined);
      }, 4000);
      //  const form_values = Object.fromEntries(data);
      //  console.log("www", form_values);
    } catch (error) {
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
          //onChange={(e: React.ChangeEvent<HTMLInputElement>)=>getImg(e)}
          //onChange={(e) => setFileUrl(e.target.files?.[0])}
          onChange={getImg}
        />
        <SubmitButton isDisabled={isDisabled}>Add</SubmitButton>
      </form>
    </div>
  );
}
