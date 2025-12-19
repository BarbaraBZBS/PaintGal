import { auth } from "@src/auth";
import Link from "next/link";
import * as motion from "motion/react-client";

export default async function UserInfo() {
  const session = await auth();
  
  return (
    <div className="grid place-content-center grid-rows-[55%_20%] gap-[3rem] mb-[2rem]">
      <div className="grid place-content-center gap-[2rem]">
        <h1 className="text-[3rem] mb-[1.5rem]">{session?.user?.firstName}</h1>
        <p className="text-[1.5rem]">{session?.user?.lastName}</p>
        <p className="text-[1.5rem]">{session?.user?.email}</p>
        <p className="text-[1.5rem]">{session?.user?.address}</p>
        <p className="text-[1.5rem]">{session?.user?.phone}</p>
      </div>
      {session?.user?.role !== "admin" && (
      <div className="grid text-center">
        <p className="font-medium text-[1.7rem] mb-[4rem]">
          Need to update your account?
        </p>
        <motion.div
          whileTap={{ scale: 0.8, animationDuration: 0.1 }}
          className="cursor-pointer text-[1.5rem]"
        >
          <Link
            href="/AccountUpdate"
            className="p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
          >
            Modify Account
          </Link>
        </motion.div>
      </div>
      )}
    </div>
  );
}
