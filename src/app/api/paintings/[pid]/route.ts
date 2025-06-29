import Painting from "@src/app/models/painting";
import dbConnect from "@src/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { writeFile } from "fs/promises";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pid: string }> }
) {
  await dbConnect();
  try {
    const { pid } = await params;
    console.log("Received pid:", new mongoose.Types.ObjectId(pid));
    console.log("typeof pid:", typeof pid);
    //const id = new mongoose.Types.ObjectId(pid);
    const painting = await Painting.findOne({ _id: pid });
    //const painting = await Painting.findById({ _id: "666caa33e487963d109b6bdb" });
    //return Response.json(painting);
    if (painting) {
      console.log(painting);
      return NextResponse.json(painting);
    } else {
      console.log(painting);
      return NextResponse.json(
        { message: "Painting not found" },
        { status: 404 }
      );
    }
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    }
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  const pid = params.pid;
  await dbConnect();
  try {
    //cannot use req.file to handle with and without file so checking content-type
    const type = req.headers.get("content-type");
    const paint = await Painting.findById({ _id: pid });
    if (!paint) {
      return NextResponse.json({ message: "Painting not found", status: 404 });
    }
    if (type === "application/json") {
      const paintToUpdate = await req.json();
      if (paintToUpdate.name) {
        paint.name = paintToUpdate.name;
      }
      if (paintToUpdate.artist) {
        paint.artist = paintToUpdate.artist;
      }
      if (paintToUpdate.category) {
        paint.category = paintToUpdate.category;
      }
      if (paintToUpdate.description) {
        paint.description = paintToUpdate.description;
      }
      if (paintToUpdate.price) {
        paint.price = Number(paintToUpdate.price);
      }
      if (paintToUpdate.onSale) {
        paint.onSale = paintToUpdate.onSale;
      }
      paint.save();
      return NextResponse.json(
        { paint, message: "Painting successfully updated" },
        { status: 200 }
      );
    } else {
      const day = new Date();
      const mm = day.getMonth() + 1;
      const dd = day.getDate();
      const yy = day.getFullYear();
      const formattedDay = mm + "_" + dd + "_" + yy;
      const data = await req.formData();
      const file: File | null = data.get("image") as unknown as File;
      const nameToFormat = file.name.split(" ");
      const formattedName = nameToFormat.join("_");
      const fileName = `${formattedDay}_` + `${formattedName}`;
      const name = data.get("name") || paint.name;
      const artist = data.get("artist") || paint.artist;
      const category = data.get("category") || paint.category;
      const description = data.get("description") || paint.description;
      const rPrice = data.get("price") || paint.price;
      const onSale = data.get("onSale") || paint.onSale;
      const image = `${process.env.CLIENT_URL}/files/${fileName}`;
      const price = Number(rPrice);
      if (!file.type.startsWith("image") || file.type === "image/gif") {
        return NextResponse.json(
          { message: "Bad file type. Only image types allowed (no gif)." },
          { status: 415 }
        );
      }
      const oldFile = paint.image.split("/files/")[1];
      const myOldPath = path.join(
        `${__dirname}`,
        "../../../../../public/files",
        `${oldFile}`
      );
      fs.unlink(myOldPath, () => {});
      await paint.updateOne({
        name,
        artist,
        category,
        description,
        price,
        image,
        onSale,
      });
      // With the file data in the buffer, we can do whatever we want with it.
      // Here it is written to the filesystem in public folder
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      //console.log(bytes, buffer);
      const myPath = path.join(
        `${__dirname}`,
        "../../../../../public/files",
        `${fileName}`
      );
      await writeFile(myPath, buffer);
      console.log(`open ${myPath} to see the uploaded file`);
      return NextResponse.json(
        { message: "Painting successfully updated" },
        { status: 200 }
      );
    }
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { pid: string } }
) {
  const pid = params.pid;
  await dbConnect();
  try {
    const removed = await Painting.findByIdAndDelete({ _id: pid });
    if (!removed) {
      return NextResponse.json({
        message:
          "Something went wrong, painting could not be removed because it does not exist.",
      });
    } else {
      const oldFile = removed.image.split("/files/")[1];
      const myPath = path.join(
        `${__dirname}`,
        "../../../../../public/files",
        `${oldFile}`
      );
      fs.unlink(myPath, () => {});
      return NextResponse.json(
        { message: "successfully deleted", removed },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({
        error: err.message,
        message: "error while trying to delete painting",
      });
    }
  }
}
