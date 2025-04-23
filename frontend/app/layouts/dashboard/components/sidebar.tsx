import { IconFlame, IconBookmark, IconHome } from "@tabler/icons-react";
import { Divider, NavLink } from "@mantine/core";
import type { Category } from "~/types";
import { Link, useLocation } from "react-router";
import Search from "~/components/search";

const mainMenu = [
  {
    key: "home",
    label: "Home",
    url: "/dashboard",
    icon: IconHome,
  },
  {
    key: "trending",
    label: "Mais populares",
    url: "/dashboard/trending",
    icon: IconFlame,
  },
  {
    key: "saved",
    label: "Salvos",
    url: "/dashboard/saved",
    icon: IconBookmark,
  },
];

export default function Sidebar({
  categories,
  close,
}: {
  categories: Category[];
  close: () => void;
}) {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-6 text-sm">
      <div className="md:hidden">
        <Search callback={close} />
      </div>

      <span className="text-xs font-semibold uppercase opacity-50">Menu</span>
      <div className="flex flex-col gap-4">
        {mainMenu.map((item) => (
          <NavLink
            key={item.key}
            className="rounded-lg"
            component={Link}
            to={item.url}
            active={pathname === item.url}
            leftSection={<item.icon size={18} />}
            label={item.label}
          />
        ))}
      </div>
      <Divider />
      <span className="text-xs font-semibold uppercase opacity-50">
        Categorias
      </span>
      <div className="flex flex-col gap-4">
        {categories.map((item) => (
          <NavLink
            key={item.id}
            className="rounded-lg"
            component={Link}
            to={`/dashboard/category/${item.id}`}
            active={pathname === `/dashboard/category/${item.id}`}
            label={item.title}
          />
        ))}
      </div>
    </div>
  );
}
