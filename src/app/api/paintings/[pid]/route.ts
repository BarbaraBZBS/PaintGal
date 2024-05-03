import Painting from "@src/app/models/painting";
import dbConnect from "@src/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function GET(
  request: NextRequest,
  { params }: { params: { pid: string } }
) {
  const pid = params.pid;
  console.log(pid);
  await dbConnect();
  try {
    const painting = await Painting.findById({ _id: pid });
    if (!painting) {
      return NextResponse.json({ message: "Painting not found" });
    } else {
      return NextResponse.json(painting);
    }
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { pid: string } }
) {
  const pid = params.pid;
  await dbConnect();
  try {
    const removed = await Painting.findByIdAndDelete({ _id: pid });
    if (!removed) {
      return NextResponse.json({
        message:
          "Something went wrong, painting could not be removed, or does not exist.",
      });
    } else {
      const oldFile = removed.image.split("/files/")[1];
      const myPath = path.join(
        `${__dirname}`,
        "../../../../../public/files",
        `${oldFile}`
      );
      fs.unlink(myPath, () => {});
      return NextResponse.json({ message: "successfully deleted", removed });
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    }
  }
}
