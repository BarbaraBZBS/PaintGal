"use client";

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  //return <body cz-shortcut-listen="true">{children}</body>;
  return <body>{children}</body>;
}
