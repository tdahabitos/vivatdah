import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/website/index.tsx", [
    index("./routes/home/index.tsx"),
    route(":slug", "./routes/page/index.tsx"),
  ]),

  ...prefix("auth", [index("./routes/auth/index.tsx")]),

  ...prefix("dashboard", [
    layout("./layouts/dashboard/index.tsx", [
      route("/", "./routes/dashboard/overview/index.tsx"),
      route("/trending", "./routes/dashboard/trending/index.tsx"),
      route("/saved", "./routes/dashboard/saved/index.tsx"),
      route("/category/:id", "./routes/dashboard/category/index.tsx"),
      route("/free-content", "./routes/dashboard/free-content/index.tsx"),
      route("/video/:id", "./routes/dashboard/video/index.tsx"),
      route("/search", "./routes/dashboard/search/index.tsx"),
      route("/account", "./routes/dashboard/account/index.tsx"),
      route("/password-reset", "./routes/dashboard/password-reset/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
