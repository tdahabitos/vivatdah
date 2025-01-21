import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../../globals.css";

import { Notifications } from "@mantine/notifications";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";

export const metadata = {
  title: "EduTDAH",
  description: "A melhor plataforma TDAH do Brasil",
};

const theme = createTheme({
  /* Custom colors */
  colors: {
    "viva-orange": [
      "#fff6e0",
      "#ffebca",
      "#ffd699",
      "#ffbf63",
      "#ffac36",
      "#ffa018",
      "#ff9904",
      "#e48500",
      "#cb7500",
      "#b16400",
    ],
    "viva-purple": [
      "#eef0fc",
      "#d8dcf3",
      "#adb5e9",
      "#808cdf",
      "#5a69d8",
      "#4453d3",
      "#3848d3",
      "#2b3abb",
      "#2433a7",
      "#1a2b93",
    ],
  },
  defaultRadius: "md",
  primaryColor: "viva-orange",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {children}
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
