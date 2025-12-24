import { NextResponse, NextRequest } from "next/server";
import { auth } from "@src/auth";

import  { PUBLIC_ROUTES, LOGIN, ROOT } from "@src/lib/routes";

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
  const {nextUrl} = request;
  const session = await auth();
  
  console.log("Middleware session:", session);
  
  const isAuthenticated = !!session?.user;
  console.log("isAuthenticated:", isAuthenticated, "Request URL:", nextUrl.pathname);

  const isPublicRoute = (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT) ;
  console.log(
    "isPublicRoute:",
    isPublicRoute,
    "Request URL:",
    nextUrl.pathname
  );
  
  if(!isAuthenticated && !isPublicRoute){
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
  
  if (
    !isPublicRoute &&
    session?.user?.role !== "admin" &&
    nextUrl.pathname !== "/UserInfo" &&
    nextUrl.pathname !== "/Cart" &&
    nextUrl.pathname !== "/Checkout" &&
    nextUrl.pathname !== "/AccountUpdate" ) {
    return NextResponse.redirect(new URL("/autherror", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    //this one gives error when signing out
    //"/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)",
    //this one seems ok
    "/((?!api|_next|.*\\..*).*)",
  ],
};
