"use client";

import {
  IconFlame,
  IconBookmark,
  IconBroadcast,
  IconHeart,
  IconHome,
} from "@tabler/icons-react";
import { ActionIcon, Divider } from "@mantine/core";
import Link from "next/link";
import { apiFetcher } from "@/services/api";
import useSWR from "swr";

const mainMenu = [
  {
    key: "news",
    label: "Novidades",
    url: "news",
    icon: IconHome,
  },
  {
    key: "trending",
    label: "Mais populares",
    url: "trending",
    icon: IconFlame,
  },
  {
    key: "live",
    label: "Ao vivo",
    url: "live",
    icon: IconBroadcast,
  },
  {
    key: "favorites",
    label: "Favoritos",
    url: "favorites",
    icon: IconHeart,
  },
  {
    key: "saved",
    label: "Salvos",
    url: "saved",
    icon: IconBookmark,
  },
];

export default function Sidebar() {
  const pathname = "/";

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("/categories", apiFetcher);

  return (
    <div className="flex flex-col gap-6 text-sm">
      <span className="text-xs font-semibold uppercase opacity-50">Menu</span>
      <div className="flex flex-col gap-8">
        {mainMenu.map((item) => (
          <Link
            key={item.key}
            href={`/dashboard/category/${item.url}`}
            className="flex items-center gap-4"
          >
            <ActionIcon
              color={`./category/${item.url}` === pathname ? "orange" : "gray"}
              size={32}
            >
              <item.icon color="white" size={18} />
            </ActionIcon>
            {item.label}
          </Link>
        ))}
      </div>
      <Divider />
      <span className="text-xs font-semibold uppercase opacity-50">
        Categorias
      </span>
      <div className="flex flex-col gap-4">
        {categories?.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/category/${item.id}`}
            className="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-100 hover:bg-slate-100/10"
          >
            {item.title === pathname && (
              <span className="w-2 h-2 block rounded-full bg-orange-500" />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
