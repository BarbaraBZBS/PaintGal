import Painting from "@src/app/models/painting";
import dbConnect from "@src/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { writeFile } from "fs/promises";

export async function GET() {
  await dbConnect();

  try {
    const paintings = await Painting.find({});

    return NextResponse.json(paintings);
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const date = JSON.stringify(Date.now());
    const newD = date.split(date[6]).pop();
    const data = await req.formData();
    const file: File | null = data.get("image") as unknown as File;
    //console.log("file details : ", file);
    const nameToFormat = file.name.split(" ");
    const formattedName = nameToFormat.join("_");
    const fileName = `${newD}_` + `${formattedName}`;

    const name = data.get("name");
    const artist = data.get("artist");
    const category = data.get("category");
    const description = data.get("description") || "";
    const rPrice = data.get("price");
    //const isNewPiece = true;
    const onSale = data.get("onSale") || false;
    const image = `${process.env.CLIENT_URL}/files/${fileName}`;

    if (!file || !name || !artist || !category || !rPrice) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        {
          status: 400,
        }
      );
    }
    const price = Number(rPrice);

    await dbConnect();
    await Painting.create({
      name,
      artist,
      category,
      description,
      price,
      image,
      //isNewPiece,
      onSale,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, we can do whatever we want with it.
    // Here it is written to the filesystem in a new location
    const myPath = path.join(
      `${__dirname}`,
      "../../../../public/files",
      `${fileName}`
    );
    await writeFile(myPath, buffer);
    console.log(`open ${myPath} to see the uploaded file`);

    return NextResponse.json(
      { message: "Painting successfully added" },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error },
      {
        status: 400,
      }
    );
  }
}
