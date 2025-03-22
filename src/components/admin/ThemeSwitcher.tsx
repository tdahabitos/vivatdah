'use client'

import { useTheme } from '@payloadcms/ui'
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function handleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <span role="button" style={{ cursor: "pointer" }} onClick={handleTheme}>
      {theme === "light" ? <IconMoon /> : <IconSun />}
    </span>
  );
}
