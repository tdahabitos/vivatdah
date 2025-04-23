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

  ...prefix("dashboard", [
    layout("./layouts/dashboard/index.tsx", [
      route("/", "./routes/dashboard/overview/index.tsx"),
      route("/trending", "./routes/dashboard/trending/index.tsx"),
      route("/saved", "./routes/dashboard/saved/index.tsx"),
      route("/category/:id", "./routes/dashboard/category/index.tsx"),
      route("/video/:id", "./routes/dashboard/video/index.tsx"),
      route("/search", "./routes/dashboard/search/index.tsx"),
      route("/settings", "./routes/dashboard/settings/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
