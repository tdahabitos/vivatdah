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
  defaultRadius: "md",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
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
