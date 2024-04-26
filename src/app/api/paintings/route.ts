import Painting from "@src/app/models/painting";
import dbConnect from "@src/lib/dbConnect";
import { NextResponse } from "next/server";

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
