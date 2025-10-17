import User from "@src/app/models/user";
import dbConnect from "@src/lib/dbConnect";
//import path from "path";
//import { fileURLToPath } from "url";
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
//import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function GET() {
  await dbConnect();
  try {
    const amount = await User.estimatedDocumentCount();
    const users = await User.find({});
    //return NextResponse.json({ amount, paintings });
    return Response.json({ amount, users });
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
    //const day = new Date();
    //const mm = day.getMonth() + 1;
    //const dd = day.getDate();
    //const yy = day.getFullYear();
    //const formattedDay = mm + "_" + dd + "_" + yy;
    const data = await req.formData();
    //    const file: File | null = data.get("image") as unknown as File;
    //
    //    const nameToFormat = file.name.split(" ");
    //    const formattedName = nameToFormat.join("_");
    //    const fileName = `${formattedDay}_` + `${formattedName}`;
    const password = data.get("password") as string;
    const email = data.get("email");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const address = data.get("address");
    const phone = data.get("phone");
    const role = data.get("role") || "user";
    if (!email || !lastName || !firstName || !address || !phone || !password) {
      return Response.json(
        { message: "Please fill all required fields." },
        {
          status: 400,
        }
      );
    }
    //if (!file.type.startsWith("image") || file.type === "image/gif") {
    //  return Response.json(
    //    { message: "Bad file type. Only image types allowed (no gif)." },
    //    { status: 415 }
    //  );
    //}
    //const price = Number(rPrice);
    await dbConnect();

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      address,
      phone,
      password: hashedPassword,
      role,
    });

    //const bytes = await file.arrayBuffer();
    //const buffer = Buffer.from(bytes);
    //console.log(bytes, buffer);

    // With the file data in the buffer, we can do whatever we want with it.
    // Here it is written to the filesystem in public folder
    //const myPath = path.join(
    //  `${__dirname}`,
    //  "../../../../public/files",
    //  `${fileName}`
    //);
    //await writeFile(myPath, buffer);
    //console.log(`open ${myPath} to see the uploaded file`);
    return Response.json(
      { message: "User successfully added", user: newUser },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.log(err);
    return Response.json({ message: "Unable to add user" }, { status: 400 });
  }
}
