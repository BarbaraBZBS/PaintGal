import {Painting} from "@src/app/models/painting";
import dbConnect from "@src/lib/dbConnect";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { writeFile } from "fs/promises";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  try {
    const amount = await Painting.estimatedDocumentCount();
    const paintings = await Painting.find({});
    //return NextResponse.json({ amount, paintings });
    return Response.json({ amount, paintings });
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      //return NextResponse.json({ error: err.message });
      return Response.json({ error: err.message });
    }
  }
}

export async function POST(req: Request) {
  try {
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
    const name = data.get("name");
    const artist = data.get("artist");
    const category = data.get("category");
    const description = data.get("description") || "";
    const rPrice = data.get("price");
    const onSale = data.get("onSale") || undefined;
    const image = `${process.env.CLIENT_URL}/files/${fileName}`;
    if (!file || !name || !artist || !category || !rPrice) {
      return Response.json(
        { message: "Please fill all required fields." },
        {
          status: 400,
        }
      );
    }
    if (!file.type.startsWith("image") || file.type === "image/gif") {
      return Response.json(
        { message: "Bad file type. Only image types allowed (no gif)." },
        { status: 415 }
      );
    }
    const price = Number(rPrice);
    await dbConnect();
    await Painting.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      artist,
      category,
      description,
      price,
      image,
      isNewPiece: true,
      onSale,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //console.log(bytes, buffer);

    // With the file data in the buffer, we can do whatever we want with it.
    // Here it is written to the filesystem in public folder
    const myPath = path.join(
      `${__dirname}`,
      "../../../../public/files",
      `${fileName}`
    );
    await writeFile(myPath, buffer);
    console.log(`open ${myPath} to see the uploaded file`);
    return Response.json(
      { message: "Painting successfully added" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.log(err);
    return Response.json(
      { message: "Unable to add painting" },
      { status: 400 }
    );
  }
}
