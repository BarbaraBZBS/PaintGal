"use client";
import GoBack from "./goBack";
import ManagePaintingsButton from "./managePaintingsButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AdminNavigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    session?.user?.role === "admin" &&
    (pathname === "/Update" ||
      pathname.startsWith("/Update/") ||
      pathname === "/Paintings" ||
      pathname === "/Gallery" ||
      pathname === "/Delete" ||
      pathname.startsWith("/Delete/")) && (
      <div className="grid grid-cols-[repeat(2,1fr)] gap-1">
        <GoBack />
        <ManagePaintingsButton />
      </div>
    )
  );
}
