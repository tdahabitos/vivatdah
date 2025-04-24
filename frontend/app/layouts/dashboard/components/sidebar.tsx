import {
  IconFlame,
  IconBookmark,
  IconHome,
  IconLock,
  IconCrown,
  IconTrophyFilled,
} from "@tabler/icons-react";
import { Divider, NavLink } from "@mantine/core";
import type { Category } from "~/types";
import { Link, useLocation } from "react-router";
import Search from "~/components/search";
import { useUser } from "~/store/user-store";
import { useEffect, useState } from "react";

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
  const { allowedCategories } = useUser();
  const [upgradeAllowed, setUpgradeAllowed] = useState(false);

  function checkUpgrade() {
    if (!allowedCategories) return;

    if (allowedCategories.length !== categories.length) {
      setUpgradeAllowed(true);
    }
  }

  useEffect(() => {
    checkUpgrade();
  }, [allowedCategories]);

  return (
    <div className="flex flex-col gap-6 text-sm">
      <div className="md:hidden">
        <Search callback={close} />
      </div>

      <span className="text-xs font-semibold uppercase opacity-50">Menu</span>
      <div className="flex flex-col gap-4">
        {upgradeAllowed && (
          <NavLink
            className="rounded-lg !bg-orange-100 !text-orange-500"
            component={Link}
            variant="light"
            to={import.meta.env.VITE_PLANS_PAGE_PATH}
            leftSection={
              <div className="bg-white/80 shadow-sm p-1 rounded-full">
                <IconTrophyFilled color="orange" size={18} />
              </div>
            }
            label="Faça Upgrade"
          />
        )}
        {mainMenu.map((category) => (
          <NavLink
            key={category.key}
            className="rounded-lg"
            component={Link}
            to={category.url}
            active={pathname === category.url}
            leftSection={<category.icon size={18} />}
            label={category.label}
          />
        ))}
      </div>
      <Divider />
      <span className="text-xs font-semibold uppercase opacity-50">
        Categorias
      </span>
      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          const hasAccess = allowedCategories?.includes(category.id);

          return (
            <NavLink
              key={category.id}
              className="rounded-lg"
              leftSection={!hasAccess && <IconLock color="orange" size={18} />}
              component={Link}
              to={
                hasAccess
                  ? `/dashboard/category/${category.id}`
                  : import.meta.env.VITE_PLANS_PAGE_PATH
              }
              active={pathname === `/dashboard/category/${category.id}`}
              label={category.title}
            />
          );
        })}
      </div>
    </div>
  );
}
