"use server";
import { signIn, signOut } from "@src/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  await signIn(action as string, { redirectTo: "/" });
}

export async function doLogout() {
  console.log("Logging out");
  await signOut({ redirectTo: "/" });
}

export async function doCredentialsLogin(formData: FormData) {
  try {
    const resp = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
}
