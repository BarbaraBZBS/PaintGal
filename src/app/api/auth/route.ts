import {User} from "@src/app/models/user";
import dbConnect from "@src/lib/dbConnect";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function GET() {
  await dbConnect();
  try {
    const amount = await User.estimatedDocumentCount();
    const users = await User.find({});
    return Response.json({ amount, users });
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return Response.json({ error: err.message });
    }
  }
}

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, address, phone, role } =
      await req.json();
    if (!email || !lastName || !firstName || !address || !phone || !password) {
      return Response.json(
        { message: "Please fill all required fields." },
        {
          status: 400,
        }
      );
    }
    if (isNaN(Number(phone))) {
      return Response.json(
        { message: "Phone number must be numeric." },
        {
          status: 400,
        }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      firstName,
      lastName,
      address,
      phone,
      password: hashedPassword,
      role: role || "user",
    });

    return Response.json(
      {
        message: "Success, you can now log in... Redirecting...",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.log(err);
    return Response.json({ message: "Unable to add user" }, { status: 500 });
  }
}
