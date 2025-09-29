"use client";

export default function BodyWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <body suppressHydrationWarning>{children}</body>;
}
