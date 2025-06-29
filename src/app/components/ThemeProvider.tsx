"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <NextThemesProvider
      {...props}
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  );
}

//import dynamic from "next/dynamic";
//
//import { type ThemeProviderProps } from "next-themes/dist/types";
//import { ThemeProvider as StaticProvider } from "next-themes";
//const DynProvider = dynamic(
//  () => import("next-themes").then((e) => e.ThemeProvider),
//  {
//    ssr: false,
//  }
//);

//export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//  const NextThemeProvider =
//    process.env.NODE_ENV === "production" ? StaticProvider : DynProvider;
//  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
//}
