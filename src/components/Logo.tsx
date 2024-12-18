"use client";

import { Image, useMantineColorScheme } from "@mantine/core";

export default function Logo() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Image
      className="max-w-xs"
      src={colorScheme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
      alt="logo"
    />
  );
}
