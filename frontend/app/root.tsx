import "./app.css";
import "@mantine/core/styles.css";
import "@splidejs/react-splide/css";

import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import {
  Button,
  ColorSchemeScript,
  Divider,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";

import type { Route } from "./+types/root";
import { IconBubbleX } from "@tabler/icons-react";
import { apiFetcher } from "./lib/api";
import ThemeSwitcher from "./components/theme-switcher";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

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
  },
  defaultRadius: "md",
  primaryColor: "viva-orange",
});

export async function loader() {
  const config = await apiFetcher("/config");
  return { administration: config.administration };
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { administration } = loaderData;

  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {administration.maintenance_mode ? (
            <div className="h-screen w-full flex justify-center items-center relative">
              <div className="absolute top-4 right-4">
                <ThemeSwitcher />
              </div>
              <div className="space-y-4">
                <img
                  src="/images/logo.svg"
                  alt="VivaTDAH"
                  className="h-28 w-auto mx-auto"
                />
                <Divider />
                <h1 className="text-xl font-bold">Voltamos em breve</h1>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Ooops";
  let details = "Ocorreu um erro inesperado";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erro";
    details =
      error.status === 404
        ? "A página solicitada não foi encontrada"
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-full flex items-center">
        <div className="p-8 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-sm text-center">
            <div className="w-full flex justify-center mb-4">
              <IconBubbleX size={120} />
            </div>
            <p className="mb-4 text-3xl tracking-tight font-bold ">{message}</p>
            <p className="mb-4 text-lg font-light ">{details}</p>
            <Button component={Link} to="/">
              Voltar para a home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
