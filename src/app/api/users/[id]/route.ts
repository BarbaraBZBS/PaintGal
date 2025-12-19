import {User} from "@src/app/models/user";
import dbConnect from "@src/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    } else  {
      const userToUpdate = await req.json();
      if(userToUpdate.password) {
        userToUpdate.password = await bcrypt.hash(userToUpdate.password, 10);
      }
      await User.findOneAndUpdate({ _id: id }, userToUpdate);
      return NextResponse.json(
        { message: "User info successfully updated" },
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
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const removed = await User.findByIdAndDelete({ _id: id });
    if (!removed) {
      return NextResponse.json({
        message:
          "Something went wrong, user could not be removed because it does not exist.",
      }, {status: 404});
    } else {
      return NextResponse.json(
        { message: "Account successfully deleted", removed },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({
        error: err.message,
        message: "Error while trying to delete user account",
      });
    }
  }
}
