import { cn } from "~/utils";
import { useMantineColorScheme } from "@mantine/core";

export default function Logo({ className }: { className?: string }) {
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <img
      className={cn("max-w-xs", className)}
      src={`/images/logo${isDarkMode ? "-dark" : ""}.svg`}
      alt="logo"
    />
  );
}
