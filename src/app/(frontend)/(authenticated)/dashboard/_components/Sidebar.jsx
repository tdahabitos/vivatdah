"use client";

import {
  IconFlame,
  IconBookmark,
  IconBroadcast,
  IconHeart,
  IconHome,
} from "@tabler/icons-react";
import { Divider, NavLink, Skeleton } from "@mantine/core";
import Link from "next/link";
import { apiFetcher } from "@/services/api";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import GeneralSearch from "./GeneralSearch";

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
    key: "live",
    label: "Ao vivo",
    url: "/dashboard/live",
    icon: IconBroadcast,
  },
  {
    key: "favorites",
    label: "Favoritos",
    url: "/dashboard/favorites",
    icon: IconHeart,
  },
  {
    key: "saved",
    label: "Salvos",
    url: "/dashboard/saved",
    icon: IconBookmark,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { data: categories, isLoading } = useSWR("/categories", apiFetcher);

  return (
    <div className="flex flex-col gap-6 text-sm">
      <div className="md:hidden">
        <GeneralSearch />
      </div>

      <span className="text-xs font-semibold uppercase opacity-50">Menu</span>
      <div className="flex flex-col gap-4">
        {mainMenu.map((item) => (
          <NavLink
            key={item.key}
            component={Link}
            href={item.url}
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
        {isLoading ? (
          <>
            <Skeleton w="100%" h={35} />
            <Skeleton w="100%" h={35} />
            <Skeleton w="100%" h={35} />
          </>
        ) : (
          categories
            ?.sort((a, b) => a.title.localeCompare(b.title))
            .map((item) => (
              <NavLink
                key={item.id}
                component={Link}
                href={`/dashboard/category/${item.id}`}
                active={pathname === `/dashboard/category/${item.id}`}
                label={item.title}
              />
            ))
        )}
      </div>
    </div>
  );
}
