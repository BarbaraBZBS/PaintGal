"use client";
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