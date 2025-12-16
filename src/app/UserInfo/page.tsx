import { auth } from "@src/auth";
import { redirect } from "next/navigation";

export default async function UserInfo() {
  const session = await auth();
  
  return (
    <div className="grid place-content-center gap-[2rem]">
      <h1 className="text-[3rem] mb-[1.5rem]">{session?.user?.firstName}</h1>

      {/*<p className="text-[1.5rem]">{session?.user?.firstName}</p>*/}
      <p className="text-[1.5rem]">{session?.user?.lastName}</p>
      <p className="text-[1.5rem]">{session?.user?.email}</p>
      <p className="text-[1.5rem]">{session?.user?.address}</p>
      <p className="text-[1.5rem]">{session?.user?.phone}</p>
    </div>
  );
}
