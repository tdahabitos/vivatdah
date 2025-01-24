"use client";

import { cn } from "@/utils";
import { Image, useMantineColorScheme } from "@mantine/core";

export default function Logo({ className }) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Image
      className={cn("max-w-xs", className)}
      src={colorScheme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
      alt="logo"
    />
  );
}
